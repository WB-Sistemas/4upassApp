package com.mycompany.nativeqrscanner;

import android.animation.ValueAnimator;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.graphics.RectF;
import android.util.TypedValue;
import android.view.View;
import android.view.animation.LinearInterpolator;

public class ScannerOverlayView extends View {
    private final Paint maskPaint = new Paint();
    private final Paint clearPaint = new Paint();
    private final Paint cornerPaint = new Paint();
    private final Paint linePaint = new Paint();
    private final RectF frameRect = new RectF();
    private ValueAnimator scanAnimator;
    private float scanLineY = 0f;

    public ScannerOverlayView(Context context) {
        super(context);
        maskPaint.setColor(0x8A000000);

        clearPaint.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.CLEAR));

        cornerPaint.setColor(0xFFA0E1BE);
        cornerPaint.setStyle(Paint.Style.STROKE);
        cornerPaint.setStrokeWidth(dp(3));
        cornerPaint.setAntiAlias(true);

        linePaint.setColor(0xFFA0E1BE);
        linePaint.setStrokeWidth(dp(2));
        linePaint.setAntiAlias(true);

        setLayerType(LAYER_TYPE_SOFTWARE, null);
    }

    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);
        float size = Math.min(w, h) * 0.7f;
        float left = (w - size) / 2f;
        float top = (h - size) / 2f;
        frameRect.set(left, top, left + size, top + size);
        startAnimator();
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        canvas.drawRect(0, 0, getWidth(), getHeight(), maskPaint);
        canvas.drawRoundRect(frameRect, dp(18), dp(18), clearPaint);

        float corner = dp(24);
        float left = frameRect.left;
        float top = frameRect.top;
        float right = frameRect.right;
        float bottom = frameRect.bottom;

        // Top-left
        canvas.drawLine(left, top + corner, left, top, cornerPaint);
        canvas.drawLine(left, top, left + corner, top, cornerPaint);
        // Top-right
        canvas.drawLine(right - corner, top, right, top, cornerPaint);
        canvas.drawLine(right, top, right, top + corner, cornerPaint);
        // Bottom-left
        canvas.drawLine(left, bottom - corner, left, bottom, cornerPaint);
        canvas.drawLine(left, bottom, left + corner, bottom, cornerPaint);
        // Bottom-right
        canvas.drawLine(right - corner, bottom, right, bottom, cornerPaint);
        canvas.drawLine(right, bottom - corner, right, bottom, cornerPaint);

        float linePadding = dp(12);
        canvas.drawLine(
                frameRect.left + linePadding,
                scanLineY,
                frameRect.right - linePadding,
                scanLineY,
                linePaint
        );
    }

    @Override
    protected void onDetachedFromWindow() {
        if (scanAnimator != null) {
            scanAnimator.cancel();
            scanAnimator = null;
        }
        super.onDetachedFromWindow();
    }

    private void startAnimator() {
        if (scanAnimator != null) {
            scanAnimator.cancel();
        }
        float start = frameRect.top + dp(8);
        float end = frameRect.bottom - dp(8);
        scanAnimator = ValueAnimator.ofFloat(start, end);
        scanAnimator.setDuration(2200);
        scanAnimator.setRepeatCount(ValueAnimator.INFINITE);
        scanAnimator.setRepeatMode(ValueAnimator.RESTART);
        scanAnimator.setInterpolator(new LinearInterpolator());
        scanAnimator.addUpdateListener(animation -> {
            scanLineY = (float) animation.getAnimatedValue();
            invalidate();
        });
        scanAnimator.start();
    }

    private float dp(float value) {
        return TypedValue.applyDimension(
                TypedValue.COMPLEX_UNIT_DIP,
                value,
                getResources().getDisplayMetrics()
        );
    }
}
