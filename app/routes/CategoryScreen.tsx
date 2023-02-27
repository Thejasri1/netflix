import {  Text,HStack } from "@chakra-ui/react"
import { Row, Col } from "antd"
import COLORS from "~/utils/colors"

const CategoryScreen = () => {
    const images = ["https://w0.peakpx.com/wallpaper/469/230/HD-wallpaper-money-heist-hero-money-heist-netflix-professor-squad-tv-show-thumbnail.jpg", "https://e1.pxfuel.com/desktop-wallpaper/49/663/desktop-wallpaper-new-movie-posters-hollywood-movie-2022-thumbnail.jpg", "https://e0.pxfuel.com/wallpapers/351/606/desktop-wallpaper-hollywood-movies-action-movie-thumbnail.jpg"]
    return (
        <Row style={{ backgroundColor: COLORS.BLACK, height: "100vh" }}>
            {/* Large devices View */}
            <Col  style={{ paddingTop: "20px" }}>
                <Col>
                    <Text color={COLORS.WHITE} _hover={{borderColor: COLORS.WHITE, border: '1px solid'}}>
                        English
                    </Text></Col>
                <Col>
                    <Text color={COLORS.WHITE} _hover={{borderColor: COLORS.WHITE, border: '1px solid'}}>
                        Indonesian
                    </Text></Col>
                <Col>
                    <Text color={COLORS.WHITE} _hover={{borderColor: COLORS.WHITE, border: '1px solid'}}>
                        Hindi
                    </Text></Col>

                <Col>
                    <Text color={COLORS.WHITE} _hover={{borderColor: COLORS.WHITE, border: '1px solid'}}>
                        Maliyalam
                    </Text></Col>
                <Col>
                    <Text color={COLORS.WHITE} _hover={{borderColor: COLORS.WHITE, border: '1px solid'}}>
                        Japanese
                    </Text></Col>
                <Col>
                    <Text color={COLORS.WHITE} _hover={{borderColor: COLORS.WHITE, border: '1px solid'}}>
                        Tamil
                    </Text></Col>
                <Col>
                    <Text color={COLORS.WHITE} _hover={{borderColor: COLORS.WHITE, border: '1px solid'}}>
                        Telugu
                    </Text></Col>
                    <Col>
                    <Text color={COLORS.WHITE} _hover={{borderColor: COLORS.WHITE, border: '1px solid'}}>
                        Matai
                    </Text></Col>
                    <Col>
                    <Text color={COLORS.WHITE} _hover={{borderColor: COLORS.WHITE, border: '1px solid'}}>
                        Spanish
                    </Text></Col>
                    <Col>
                    <Text color={COLORS.WHITE} _hover={{borderColor: COLORS.WHITE, border: '1px solid'}}>
                    Russian
                    </Text></Col>
                    <Col>
                    <Text color={COLORS.WHITE} _hover={{borderColor: COLORS.WHITE, border: '1px solid'}}>
                    Portuguese
                    </Text></Col>
            </Col>
            <Col  style={{ marginTop: "20px" }}>
                <Row>
                    <Col>
                        {images.map((img: any) => {
                            return (
                                <HStack  _hover={{borderColor: COLORS.WHITE, border: '2px solid'}} color={COLORS.WHITE} key={img}>
                                <img src={img} alt="netFlixIcon" height={200} width={150} style={{ margin: "5px" }} key={img} />
                                </HStack>
                            )
                        })}
                    </Col>
                </Row>

            </Col>
        </Row>
    )
}
export default CategoryScreen