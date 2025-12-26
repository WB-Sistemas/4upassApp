import { Animation, createAnimation } from '@ionic/angular';

const TRANSITION_DURATION = 180;

/**
 * Nav animation con slide horizontal: forward empuja hacia la izquierda,
 * back vuelve hacia la derecha.
 */
export const fadeNavAnimation = (
  baseEl: HTMLElement,
  opts?: { enteringEl: HTMLElement; leavingEl?: HTMLElement }
): Animation => {
  const direction = (opts as { direction?: 'forward' | 'back' })?.direction ?? 'forward';
  const isBack = direction === 'back';
  const enteringFrom = isBack ? 'translate3d(-100%, 0, 0)' : 'translate3d(100%, 0, 0)';
  const leavingTo = isBack ? 'translate3d(30%, 0, 0)' : 'translate3d(-30%, 0, 0)';

  const enteringAnimation = createAnimation()
    .addElement(opts?.enteringEl ?? baseEl)
    .beforeStyles({ background: 'var(--ion-background-color)' })
    .duration(TRANSITION_DURATION)
    .easing('cubic-bezier(0.36,0.66,0.04,1)')
    .fromTo('transform', enteringFrom, 'translate3d(0, 0, 0)');

  const rootAnimation = createAnimation()
    .duration(TRANSITION_DURATION)
    .addAnimation(enteringAnimation);

  if (opts?.leavingEl) {
    const leavingAnimation = createAnimation()
      .addElement(opts.leavingEl)
      .beforeStyles({ background: 'var(--ion-background-color)' })
      .duration(TRANSITION_DURATION)
      .easing('cubic-bezier(0.36,0.66,0.04,1)')
      .fromTo('transform', 'translate3d(0, 0, 0)', leavingTo);
    rootAnimation.addAnimation(leavingAnimation);
  }

  return rootAnimation;
};
