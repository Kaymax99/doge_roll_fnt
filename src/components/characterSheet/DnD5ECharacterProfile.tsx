import { Col, Container, Row } from "react-bootstrap"
import Select from 'react-select'
import { CharAlignments, CharLevels, CharSizes } from "./CharSelectOptions"

export const DnD5ECharacterProfile = () => {
    return (
        <Container className="charSheet">
            <Row className="charSheetInfo">
                <Col md={3} className="charRndBorder charName">
                    <div className="my-2">
                        <div className="mt-4">
                            <input 
                            type="text" 
                            id="characterName" 
                            className="charInputField ps-2 w-100"
                            />
                        </div>
                        <label className="charLabel">Character Name</label>
                    </div>
                </Col>
                <Col md={9} className="charRndBorder">
                    <div className="charDetails my-2">
                        <Row className="align-items-end">
                            <Col sm={9}>
                                <div className="d-flex justify-content-between charInputField">
                                    <input 
                                    type="text"
                                    className="border-0 me-2 w-100 ps-2"/>
                                    <Select options={CharLevels} className="charSelect charLvl"/>
                                </div>
                                <label className="charLabel">Class & Level</label>
                            </Col>
                            <Col sm={3}>
                                <input 
                                type="text"
                                className="charInputField ps-2 w-100"/>
                                <label className="charLabel">Background</label>
                            </Col>
                        </Row>
                        <Row className="align-items-end">
                            <Col xs={12} sm={6} md={3}>
                                <div>
                                    <input 
                                    type="text"
                                    className="charInputField pb-1 ps-2"/>
                                </div>
                                <label className="charLabel">Race</label>
                            </Col>
                            <Col xs={12} sm={6} md={3}>
                                <div className="charInputField">
                                    <Select options={CharSizes} className="charSelect"/>
                                </div>
                                <label className="charLabel">Size</label>
                            </Col>
                            <Col xs={12} sm={6} md={3}>
                                <div className="charInputField">
                                    <Select options={CharAlignments} className="charSelect"/>
                                </div>
                                <label className="charLabel">Alignment</label>
                            </Col>
                            <Col xs={12} sm={6} md={3} className="">
                                <div className="charInputField d-flex">
                                    <Col className="flex-grow-1 text-center">
                                        <input type="number" min={0} className="text-center border-0  w-100"/>
                                    </Col>
                                    <Col xs={1}>/</Col>
                                    <Col className="flex-grow-1 text-center">
                                        <span>20000</span>
                                    </Col>
                                </div>
                                <label className="charLabel">Exp Points</label>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <Row className="charSheetMain">

            </Row>
        </Container>
    )
}