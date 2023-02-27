import { Box, Stack, Text ,HStack,Img} from "@chakra-ui/react";
import COLORS from "~/utils/colors";
import { useState } from "react"
import { Col, Row } from 'antd';
import { FaBackspace } from "react-icons/fa"
import { RiSpace } from "react-icons/ri"

const SearchScreen = () => {
    const [selectedFont, setSelectedFont]: any = useState("")
    const images = ["https://w0.peakpx.com/wallpaper/469/230/HD-wallpaper-money-heist-hero-money-heist-netflix-professor-squad-tv-show-thumbnail.jpg", "https://e1.pxfuel.com/desktop-wallpaper/49/663/desktop-wallpaper-new-movie-posters-hollywood-movie-2022-thumbnail.jpg", "https://e0.pxfuel.com/wallpapers/351/606/desktop-wallpaper-hollywood-movies-action-movie-thumbnail.jpg"]

    return (
        <Row style={{ backgroundColor: COLORS.BLACK, height: "100vh" }}>
            {/* Large devices View */}
            <Col  style={{ paddingTop: "20px" }}>
                <Row>
                    <Text bg={COLORS.LIGHT_GRAY} w={130} h={20} p={5} m={3} onClick={() => setSelectedFont("space")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}><RiSpace color={COLORS.WHITE} /></Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={50} h={20} p={5} m={3} onClick={() => setSelectedFont("clear")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}><FaBackspace color={COLORS.WHITE} /></Text>
                    {/* <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} onClick={() => setSelectedFont("search")}><BiSearchAlt2 color={COLORS.WHITE} /></Text> */}
                </Row>
                <Row>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("a")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>a</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("b")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>b</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("c")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>c</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("d")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>d</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("e")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>e</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("f")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>f</Text>
                </Row>
                <Row>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("g")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>g</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("h")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>h</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("i")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>i</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("j")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>j</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("k")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>k</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("l")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>l</Text>
                </Row>
                <Row>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("m")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>m</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("n")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>n</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("o")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>o</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("p")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>p</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("q")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>q</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("r")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>r</Text>
                </Row>
                <Row>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("s")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>s</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("t")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>t</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("u")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>u</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("v")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>v</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("w")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>w</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("x")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>x</Text>
                </Row>
                <Row>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("y")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>y</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("z")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>z</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("1")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>1</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("2")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>2</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("3")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>3</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("4")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>4</Text>
                </Row>
                <Row>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("5")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>5</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("6")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>6</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("7")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>7</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("8")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>8</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("9")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>9</Text>
                    <Text bg={COLORS.LIGHT_GRAY} w={20} h={20} p={5} m={3} color={COLORS.WHITE} onClick={() => setSelectedFont("0")} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>0</Text>
                </Row>
                <Stack color={COLORS.WHITE}>
                    <Text pb={10} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>Horror</Text>
                    <Text pb={10} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>Crime</Text>
                    <Text pb={10} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>Fiction</Text>
                    <Text pb={10} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>Comedy</Text>
                    <Text pb={10} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>Anime</Text>
                    <Text pb={10} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>Telugu</Text>
                    <Text pb={10} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>English</Text>
                    <Text pb={10} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>Hindi</Text>
                    <Text pb={10} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>Tamil</Text>
                    <Text pb={10} _hover={{ borderColor: COLORS.WHITE, border: '1px solid' }}>Maliyalam</Text>
                </Stack>
            </Col>
            <Col >
                <Text color={COLORS.WHITE} fontSize={20}>Top Searches</Text>
                <Row>
                    <Col>
                        {images.map((img: any) => {
                            return (
                                <HStack _hover={{ borderColor: COLORS.WHITE, border: '2px solid' }} color={COLORS.WHITE} key={img}>
                                    <Img src={img} alt="netFlixIcon" height={200} width={150} style={{ margin: "5px" }} key={img} />
                                </HStack>
                            )
                        })}
                    </Col>
                </Row>
            </Col>
            {/* small to medium devices */}
        </Row>
    )
}
export default SearchScreen