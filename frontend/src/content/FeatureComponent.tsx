import {Row, Col, Button} from "antd";
import React, { useEffect, useState } from "react";
import { Graph } from "./Graph/Graph";
import { getChilds } from "./Graph/utils/getChilds";
import { Join } from "./Join/Join";
import {Link as RouterLink} from "react-router-dom";
import {LeftOutlined} from "@ant-design/icons";

const FeatureComponent = () => {
    const [state, setState] = useState({
        data: null,
    });

    function fetchData() {
        fetch("https://bugprod-webtable.herokuapp.com/get-all-metadata", {
            headers: {
                "Content-Type": "application/json",
                sessionKey: "test",
            },
        })
            .then((res: Response) => {
                return res.json();
            })
            .then(
                (result) => {
                    console.log("result=>", result);

                    setState((prevState) => {
                        const updatedValues = {
                            data: {
                                name: "main",
                                children: [...result.map((r) => getChilds(r))],
                            },
                        };

                        return { ...prevState, ...updatedValues };
                    });

                    console.log(state);
                },
                (error) => {}
            );
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Row className="site-layout-background" style={{ padding: 24, minHeight: 360,width:'100%'}}>
            <Col xl={24}>
                <Join onJoin={(e) => fetchData()} data={state.data} />
                <Graph data={state.data} />

            </Col>
            <Col xl={24} style={{marginTop: 5}}>
                <Button style={{fontWeight:500}} type={'primary'} >
                    <RouterLink
                        to={'/home'}>
                        <LeftOutlined /> Back to table
                    </RouterLink>
                </Button>
            </Col>
        </Row>
    );
};

export default FeatureComponent;
