import { Animation, createAnimation } from '@ionic/angular';

const TRANSITION_DURATION = 180;

/**
 * Nav animation que evita los empujes verticales del slide default y deja
 * un fade rápido entre pantallas para que los headers se vean inmediatos.
 */
export const fadeNavAnimation = (
  baseEl: HTMLElement,
  opts?: { enteringEl: HTMLElement; leavingEl?: HTMLElement }
): Animation => {
  const enteringAnimation = createAnimation()
    .addElement(opts?.enteringEl ?? baseEl)
    .duration(TRANSITION_DURATION)
    .easing('cubic-bezier(0.36,0.66,0.04,1)')
    .fromTo('opacity', 0.01, 1)
    .fromTo('transform', 'translate3d(0, 8px, 0)', 'translate3d(0, 0, 0)');

  const rootAnimation = createAnimation()
    .duration(TRANSITION_DURATION)
    .addAnimation(enteringAnimation);

  if (opts?.leavingEl) {
    const leavingAnimation = createAnimation()
      .addElement(opts.leavingEl)
      .duration(TRANSITION_DURATION)
      .easing('cubic-bezier(0.36,0.66,0.04,1)')
      .fromTo('opacity', 1, 0);
    rootAnimation.addAnimation(leavingAnimation);
  }

  return rootAnimation;
};
