import React from "react";
import {Button, TreeSelect, Spin, Row, Col} from "antd";
import {TreeNode} from "antd/lib/tree-select";


export class Join extends React.Component {
    // data;
    dataset: string = "";
    joinDataset: string = "";
    field: string = "";
    joinField: string = "";
    reqBody: object = {}

    constructor(props: any) {
        super(props);
    }

    onChangeFirst(value) {
        this.dataset = value.split(".")[1];
        this.field = value.slice(this.dataset.length + 2);
    }

    onChangeSecond(value) {
        this.joinDataset = value.split(".")[1];
        this.joinField = value.slice(this.joinDataset.length + 2);
    }


    goJoinBro() {
        this.props.onJoin();

        const body = {
            dataset: this.dataset,
            field: this.field,
            joinDataset: this.joinDataset,
            joinField: this.joinField,
        };
        this.reqBody = body

        fetch("https://bugprod-webtable.herokuapp.com/join", {
            headers: {
                "Content-Type": "application/json",
                sessionKey: "test",
            },
            method: "POST",
            body: JSON.stringify(body),
        })
            .then((res: Response) => {
                return res.json();
            })
            .then(
                (result) => {
                    console.log("result=>", result);
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            );
    }

    // onJoin() {}

    renderTreeSelect(node, prevNodeName = "") {
        return node?.children?.map((ch) => {
            const value = ch.name;
            return node?.children ? (
                <TreeNode value={`${prevNodeName}.${value}`} title={value} key={Math.random()}>
                    {this.renderTreeSelect(ch, `${prevNodeName}.${value}`)}
                </TreeNode>
            ) : (
                <TreeNode value={`${prevNodeName}.${value}`} title={value} key={Math.random()}></TreeNode>
            );
        });
    }

    render() {


        console.log('reqBody', JSON.stringify(this.reqBody))
        return this.props.data ? (
            <Col xl={24}>
                <Row style={{marginBottom: "20px", width: '100%'}}>
                    <Col xl={21} style={{display:'flex'}}>
                        <Row>
                            <Col xl={24}>
                                <i style={{fontWeight:500}}> Select field from first dataset</i>
                                <TreeSelect
                                    showSearch
                                    style={{width: "100%", marginBottom: "10px"}}
                                    dropdownStyle={{maxHeight: 400, overflow: "auto"}}
                                    placeholder="Please select"
                                    allowClear
                                    treeDefaultExpandAll
                                    onChange={this.onChangeFirst.bind(this)}
                                >
                                    {this.renderTreeSelect(this.props.data)}
                                </TreeSelect>
                            </Col>
                        </Row>

                        <Row>
                            <Col xl={24} style={{marginLeft:20}}>
                                <i style={{fontWeight:500}}>Select field from second dataset</i>
                                <TreeSelect
                                    showSearch
                                    style={{width: "100%"}}
                                    dropdownStyle={{maxHeight: 400, overflow: "auto"}}
                                    placeholder="Please select"
                                    allowClear
                                    treeDefaultExpandAll
                                    onChange={this.onChangeSecond.bind(this)}
                                >
                                    {this.renderTreeSelect(this.props.data)}
                                </TreeSelect>
                            </Col>
                        </Row>


                    </Col>
                    <Col xl={24} style={{marginTop: "10px", fontWeight: 500}}>
                        <i>Join and download</i>
                    </Col>

                    <Col xl={24}>
                        <Button onClick={this.goJoinBro.bind(this)}
                                type={'primary'}
                                style={{marginTop: "10px"}}>
                            Join
                        </Button>
                        <Button
                            href={`data:text/json;charset=utf-8,${encodeURIComponent(
                                JSON.stringify(this.reqBody))}`}
                            download="filename.json"
                            type={'primary'}
                            disabled={JSON.stringify(this.reqBody) === '{}'}
                            style={{marginTop: "20px", marginLeft: 20}}>
                            Download
                        </Button>
                    </Col>
                </Row>
            </Col>
        ) : (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%'
            }}>
                <Spin tip="Loading..." size="large"/>
            </div>
        );
    }
}


// export const Join = (props:any) =>{
//     // data;
//     let dataset: string = "";
//     let joinDataset: string = "";
//     let field: string = "";
//     let joinField: string = "";
//     let reqBody:object={}
//
//
//
//     const onChangeFirst = (value) => {
//        dataset = value.split(".")[1];
//        field = value.slice(this.dataset.length + 2);
//     }
//
//     const onChangeSecond = (value) =>{
//         joinDataset = value.split(".")[1];
//        joinField = value.slice(joinDataset.length + 2);
//     }
//
//
//     const goJoinBro = () =>{
//        props.onJoin();
//
//         const body = {
//             dataset: dataset,
//             field: field,
//             joinDataset:joinDataset,
//             joinField: joinField,
//         };
//
//
//         fetch("https://bugprod-webtable.herokuapp.com/join", {
//             headers: {
//                 "Content-Type": "application/json",
//                 sessionKey: "test",
//             },
//             method: "POST",
//             body: JSON.stringify(body),
//         })
//             .then((res: Response) => {
//                 return res.json();
//             })
//             .then(
//                 (result) => {
//                     console.log("result=>", result);
//                 },
//                 (error) => {
//                     console.log('error',error)
//                 }
//             );
//     }
//
//     // onJoin() {}
//
//     const renderTreeSelect = (node, prevNodeName = "") =>{
//         return node?.children?.map((ch) => {
//             const value = ch.name;
//             return node?.children ? (
//                 <TreeNode value={`${prevNodeName}.${value}`} title={value} key={Math.random()}>
//                     {renderTreeSelect(ch, `${prevNodeName}.${value}`)}
//                 </TreeNode>
//             ) : (
//                 <TreeNode value={`${prevNodeName}.${value}`} title={value} key={Math.random()}></TreeNode>
//             );
//         });
//     }
//
//         return props.data ? (
//             <Col xl={24}>
//                 <Row style={{ marginBottom: "20px", width:'100%' }}>
//                     <Col xl={7}>
//                         <h3>Select field from first dataset</h3>
//                         <TreeSelect
//                             showSearch
//                             style={{ width: "100%", marginBottom: "10px" }}
//                             dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
//                             placeholder="Please select"
//                             allowClear
//                             treeDefaultExpandAll
//                             onChange={onChangeFirst}
//                         >
//                             {renderTreeSelect(props.data)}
//                         </TreeSelect>
//
//                         <h3>Select field from second dataset</h3>
//                         <TreeSelect
//                             showSearch
//                             style={{ width: "100%"}}
//                             dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
//                             placeholder="Please select"
//                             allowClear
//                             treeDefaultExpandAll
//                             onChange={onChangeSecond}
//                         >
//                             {renderTreeSelect(props.data)}
//                         </TreeSelect>
//
//
//                     </Col>
//
//                     <Col xl={24}>
//                         <Button onClick={goJoinBro}
//                                 type={'primary'}
//                                 style={{ marginTop: "20px" }}>
//                             Join
//                         </Button>
//                         <Button
//                             type={'primary'}
//                             style={{ marginTop: "20px",marginLeft:20 }}>
//                             Download
//                         </Button>
//                     </Col>
//                 </Row>
//             </Col>
//         ) : (
//             <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
//                 <Spin tip="Loading..." size="large"/>
//             </div>
//         );
//
// }
