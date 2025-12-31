package com.mycompany.nativeqrscanner;

import android.app.Activity;
import android.os.Bundle;

public class ScannerActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // TEMPORAL: después va UI + cámara
        finish();
    }
}
