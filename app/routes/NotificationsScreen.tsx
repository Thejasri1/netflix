import { Box, Text, Stack, Flex } from "@chakra-ui/react"
import { Row, Col } from "antd"
import COLORS from "~/utils/colors"

const NotificationsScreen = () => {
    const images = [{ movieName: "Money Heist", url: "https://w0.peakpx.com/wallpaper/469/230/HD-wallpaper-money-heist-hero-money-heist-netflix-professor-squad-tv-show-thumbnail.jpg" }, { movieName: "Morbius", url: "https://e1.pxfuel.com/desktop-wallpaper/49/663/desktop-wallpaper-new-movie-posters-hollywood-movie-2022-thumbnail.jpg" }, { movieName: "Gamer", url: "https://e0.pxfuel.com/wallpapers/351/606/desktop-wallpaper-hollywood-movies-action-movie-thumbnail.jpg" }]
    return (
        <Stack p={10} align="center">
            <Text color={COLORS.WHITE} fontSize={20}>New Araivals</Text>
            {images.map((img: any) => {
                return (
                    <Flex key={img}>
                       <Stack  _hover={{borderColor: COLORS.WHITE, border: '2px solid',transform:"scale(1.10,1.10)"}} color={COLORS.WHITE}>
                        <img src={img.url} alt="netFlixIcon" height={100} width={250} style={{ margin: "5px" }} key={img} />
                        </Stack> 
                        <Text color={COLORS.WHITE}>{img.movieName}</Text>
                    </Flex>
                )
            })}
        </Stack>
    )
}
export default NotificationsScreen