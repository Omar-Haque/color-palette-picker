"use client";
import { Typography, Box, Button } from "@mui/material";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { hexToRgb, rgbToHex } from "@mui/material/styles";

export default function Home() {
    const [color, setColor] = useColor("#000");

    // input: h in [0,360] and s,v in [0,1] - output: r,g,b in [0,1]
    function hsv2rgb(h, s, v) {
        let f = (n, k = (n + h / 60) % 6) =>
            v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
        return [f(5), f(3), f(1)];
    }

    function generateAnalogous(hsvcolor) {
        let h = hsvcolor.h;
        let s = hsvcolor.s;
        let v = hsvcolor.v;
        let rgbArray1 = hsv2rgb((h + 30) % 360, s / 100, v / 100);
        let rgbArray2 = hsv2rgb((h - 30 + 360) % 360, s / 100, v / 100);
        return [
            `rgb(${rgbArray1[0] * 255}, ${rgbArray1[1] * 255}, ${
                rgbArray1[2] * 255
            })`,
            `rgb(${rgbArray2[0] * 255}, ${rgbArray2[1] * 255}, ${
                rgbArray2[2] * 255
            })`,
        ];
    }

    function generateTriadic(hsvcolor) {
        let h = hsvcolor.h;
        let s = hsvcolor.s;
        let v = hsvcolor.v;
        let rgbArray1 = hsv2rgb((h + 120) % 360, s / 100, v / 100);
        let rgbArray2 = hsv2rgb((h + 240) % 360, s / 100, v / 100);
        return [
            `rgb(${rgbArray1[0] * 255}, ${rgbArray1[1] * 255}, ${
                rgbArray1[2] * 255
            })`,
            `rgb(${rgbArray2[0] * 255}, ${rgbArray2[1] * 255}, ${
                rgbArray2[2] * 255
            })`,
        ];
    }

    function generateComplementary(rgbcolor) {
        let r = rgbcolor.r;
        let g = rgbcolor.g;
        let b = rgbcolor.b;
        return `rgb(${255 - r}, ${255 - g}, ${255 - b})`;
    }

    // Generate the colors
    const primaryColor = color.hex;
    const complementaryColor = generateComplementary(color.rgb);
    const analogousColor = generateAnalogous(color.hsv);
    const triadicColor = generateTriadic(color.hsv);

    return (
        <Box
            width="100vw"
            height="100vh"
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{
                bgcolor: "#FAFAFA",
            }}
        >
            <Box
                width={"100vw"}
                height={"90vh"}
                display={"flex"}
                alignItems={"center"}
                flexDirection={"column"}
                textAlign={"center"}
            >
                <Typography color={color.hex} variant="h2" fontWeight={"bold"}>
                    Color palettes
                </Typography>
                <Box
                    display={"flex"}
                    width={"100%"}
                    padding={2}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Box>
                        <ColorPicker
                            hideInput={["rgb", "hsv"]}
                            color={color}
                            onChange={setColor}
                            hideAlpha={true}
                        />
                    </Box>
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        flexDirection={"column"}
                        height="50%"
                        sx={{
                            aspectRatio: "1/1",
                        }}
                    >
                        <Typography variant="h6">PRIMARY</Typography>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: primaryColor,
                                height: "100%",
                                aspectRatio: "1 / 1",
                                "&.MuiButtonBase-root:hover": {
                                    bgcolor: primaryColor,
                                },
                            }}
                        ></Button>
                    </Box>
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        height="50%"
                        flexDirection={"column"}
                        sx={{
                            aspectRatio: "1/1",
                        }}
                    >
                        <Typography variant="h6">COMPLEMENTARY</Typography>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: complementaryColor,
                                height: "100%",
                                aspectRatio: "1 / 1",
                                "&.MuiButtonBase-root:hover": {
                                    bgcolor: complementaryColor,
                                },
                            }}
                        ></Button>
                    </Box>
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        height="50%"
                        flexDirection={"column"}
                        sx={{
                            aspectRatio: "1/1",
                        }}
                    >
                        <Typography variant="h6">ANALOGOUS</Typography>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: analogousColor[0],
                                height: "100%",
                                aspectRatio: "1 / 1",
                                "&.MuiButtonBase-root:hover": {
                                    bgcolor: analogousColor[0],
                                },
                            }}
                        ></Button>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: analogousColor[1],
                                height: "100%",
                                aspectRatio: "1 / 1",
                                "&.MuiButtonBase-root:hover": {
                                    bgcolor: analogousColor[1],
                                },
                            }}
                        ></Button>
                    </Box>
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        flexDirection={"column"}
                        height="50%"
                        sx={{
                            aspectRatio: "1/1",
                        }}
                    >
                        <Typography variant="h6">TRIADIC</Typography>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: triadicColor[0],
                                height: "100%",
                                aspectRatio: "1 / 1",
                                "&.MuiButtonBase-root:hover": {
                                    bgcolor: triadicColor[0],
                                },
                            }}
                        ></Button>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: triadicColor[1],
                                height: "100%",
                                aspectRatio: "1 / 1",
                                "&.MuiButtonBase-root:hover": {
                                    bgcolor: triadicColor[1],
                                },
                            }}
                        ></Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
