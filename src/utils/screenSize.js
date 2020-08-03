export function getScreenSize(screen) {
  const SCREEN_WIDTH = screen.width;
  const IPAD_WIDTH = 768;
  const IPAD_PRO_WIDTH = 1024;

  if (SCREEN_WIDTH < IPAD_WIDTH) {
    return 'small';
  }
  if (SCREEN_WIDTH >= IPAD_WIDTH && SCREEN_WIDTH < IPAD_PRO_WIDTH) {
    return 'medium';
  }
  if (SCREEN_WIDTH >= IPAD_PRO_WIDTH) {
    return 'large';
  }
}
