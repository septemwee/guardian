import { Text } from 'react-native';

export function applyGlobalFont(fontName: string) {
  const TextAny = Text as any; // 👈 บอก TypeScript ให้เงียบ

  const oldRender = TextAny.render;

  TextAny.render = function (...args: any[]) {
    const origin = oldRender.apply(this, args);
    return {
      ...origin,
      props: {
        ...origin.props,
        style: [{ fontFamily: fontName }, origin.props.style],
      },
    };
  };
}
