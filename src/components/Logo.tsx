
const kLogoWidth = 2682;
const kLogoHeight = 1227;
const kScale = 0.15;

export const getLogoSizeScaled = () =>
{
    const width = kLogoWidth * kScale;
    const height = kLogoHeight * kScale;
    return {width, height};
}
