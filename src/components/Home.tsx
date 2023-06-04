import { Button, Col, Container, Row } from "react-bootstrap";
import { useAppSelector } from "../hooks/hooks"
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";


export const 
Home = () => {
    const user = useAppSelector((state) => state.user.content);
    useDocumentTitle(`Home | DogeRoll`);

    return (
        <Container fluid className="pageContent mainContent">
            {!user?.id ? 
                <Row className="bgWhite m-0">
                    <div className="banner">
                        <div className="bannerImg"/>
                        <div className="headline">
                            <Link to={"/account/register"}>
                                Your world, your maps
                            </Link>
                        </div>
                    </div>
                    <Row className="w-100 align-items-center my-5">
                        <Col xs={10}>
                            <p className="m-0 fs-3">DogeRoll is a Dungeon Master tool for the creation of top-down view maps that you can use with your friends. You can also use it as a character sheet handler as it packs almost all features you may need to play.</p>
                        </Col>
                        <Col xs={2}>
                            <Button variant="secondary" className="w-100 text-light">
                                <Link to={"/account/register"}>
                                    Create an account now
                                </Link>
                            </Button>
                        </Col>
                    </Row>
                    
                </Row>
                : 
                <Row className="bgWhite m-0">
                    <div className="headlineLog">
                        <div className="text-center">
                            <h1>Welcome back!</h1>
                        </div>
                        <Row className="align-items-center mb-2">
                            <Col xs={10}>
                                <p className="m-0 fs-3">So... where to start? It's quite easy! Head into your "My Games" section either by clicking the button on the navigation bar at the top, or the button next to this text and get your first game running!</p>
                            </Col>
                            <Col xs={2}>
                                <Button variant="secondary" className="w-100 text-light">
                                    <Link to={"/campaigns/search"}>
                                        Take me to My Games
                                    </Link>
                                </Button>
                            </Col>
                        </Row>
                        <p className="m-0 fs-3">Okay, well that was pretty obvious, but how does it all work? Well, after you've created your game and launched it, you'll find yourself staring at a white screen with a grid. Using it is really simple: you can create a simple token from a picture URL simply by right clicking on the screen and selecting "New Token" and then "From Url"</p>
                        <div className="createFromUrlWrapper my-2">
                            <img src="https://i.imgur.com/ttbeuYH.gif" alt="Token creation from URL"/>
                        </div>
                        <p className="m-0 fs-3">This however is more fit for pictures that will be used as Map. If you want to use an image that rappresents a character, you should create one and assign them a picture, so you always have it at the ready. How does one go about doing that? Well...</p>
                        <div className="createFromUrlWrapper my-2">
                            <img src="https://i.imgur.com/nSiAgTG.gif" alt="Token creation from URL"/>
                        </div>
                        <p className="fs-3">Done! Now feel free to refresh the page, your character will stay there! Once the page is back, you'll see that you can drag the character's image and drop it directly into the screen. Neat!</p>
                        <div className="createFromUrlWrapper my-2">
                            <img src="https://i.imgur.com/bn59C9i.gif" alt="Token creation from URL"/>
                        </div>
                        <p className="fs-3">What else can you do that will help you in making your maps? Well, you can select a token, then right click on it and a different menu will show up. You'll see several actions: the first 4 are fairly simple, the "To" actions move the token all the way front or back, while the "Move" actions will just move the token one position in each direction. This simulates depth and allows you to layer your map. Delete is pretty self-explainatory, while the layer action simply moves the token to the layer you chose. Note that the current layer is highlighted for convenience.</p>
                        <p className="fs-3">By default the selected layer is the "Token" layer, which should be used for objects and characters, but you may also want to select the "Map" layer, which also shows <i>behind</i> the grid. To do that all you have to do is hover over light blue button on the left and select the layer you want.</p>
                        <div className="createFromUrlWrapper my-2">
                            <img src="https://i.imgur.com/juVJOua.gif" alt="Token creation from URL"/>
                        </div>
                        <p className="fs-3">Whenever you select a layer, you may only move and modify the tokens on said layer, and tokens on the opposite layer will be only visible but not controllable. Moreover, if you select the map layer, the tokens on the Token layer will become slightly transparent, so you can have their reference as you move around or place a map.</p>
                        <p className="fs-3">That's about it really! Through layering you can achieve all kinds of maps, all it takes is some practice! Also, any time you leave the page your tokens are saved, so no progress loss. You can just come back another time and all your tokens will be restored!</p>
                    </div>
                </Row>
            }
        </Container>
    )
}