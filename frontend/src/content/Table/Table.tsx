import {Button, Spin, Table, Tree, Row, Col, Tag, Empty} from "antd";
import {RightOutlined} from "@ant-design/icons";
import React from "react";
import {MetaData} from "./model";
import { Link as RouterLink } from 'react-router-dom';
const {TreeNode} = Tree
import './styles.css'

export class MainTable extends React.Component {
    state: { filteredInfo: any; sortedInfo: any; metadata: any, activeButton: string } = {
        filteredInfo: {
            type: null,
            name: null,
            namespace: null,
            doc: null,
            fields: {
                name: null,
                type: null
            }
        },
        sortedInfo: {
            columnKey: null,
            order: null
        },
        metadata: {
            error: null,
            isLoaded: false,
            items: []
        },
        activeButton: 'all'
    };

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        fetch("https://bugprod-webtable.herokuapp.com/get-all-metadata", {
            headers: {
                'Content-Type': 'application/json',
                'sessionKey': 'test1'
            },
        })
            .then((res: Response) => {
                return res.json();
            })
            .then(
                (result: MetaData) => {
                    console.log('result=>', result)
                    this.setState({
                        metadata: {
                            isLoaded: true,
                            items: result
                        }
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    handleChange = (pagination: any, filters: any, sorter: any) => {
        console.log("Various parameters", pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    clearFilters = () => {
        this.setState({
            filteredInfo: {
                type: null,
                name: null,
                namespace: null,
                doc: null,
                fields: {
                    name: null,
                    type: null
                }
            },
            activeButton: 'filter'
        });
    };

    clearAll = () => {
        this.setState({
            filteredInfo: {
                type: null,
                name: null,
                namespace: null,
                doc: null,
                fields: {
                    name: null,
                    type: null
                }
            },
            sortedInfo: {
                columnKey: null,
                order: null
            },
            activeButton: 'all'
        });
    };

    setAgeSort = () => {
        this.setState({
            sortedInfo: {
                order: "descend",
                columnKey: "age",
            },
            activeButton: 'age'
        });
    };


    render() {
        let {sortedInfo, filteredInfo} = this.state;
        const onSelect = (keys: any, info: any) => {
            console.log('Trigger Select', keys, info);
        };

        const onExpand = () => {
            console.log('Trigger Expand');
        };

        const renderTreeNodes = (data: any) =>
            data.map((item: any, index: number) => {
                console.log(item)
                if (item.fields) {
                    //console.log(item)
                    return (
                        <TreeNode title={item.name} key={index}>
                            {renderTreeNodes(item.fields)}
                        </TreeNode>
                    )
                }
                return <TreeNode title={item.name} key={index} {...item} />
            })
        const columns: any = [
            {
                title: "HeadSelector",
                dataIndex: "name",
                key: "name",
                filters: [
                    {text: "SampleHiveSchema", value: "SampleHiveSchema"},
                    {text: "SampleHdfsDataset", value: "SampleHdfsDataset"},
                    {text: "fct_users_deleted", value: "fct_users_deleted"},
                    {text: "ProductsSample", value: "ProductsSample"},
                    {text: "LogSample", value: "LogSample"},
                    {text: "CountriesDataset", value: "CountriesDataset"},
                ],
                filteredValue: filteredInfo.name,
                onFilter: (value: any, record: { name: string | any[] }) => record.name.includes(value),
                sorter: (a: { name: string | any[] }, b: { name: string | any[] }) => a.name.length - b.name.length,
                sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
                ellipsis: true,
                render: (name) => <h3><a>{name}</a></h3>
            },
            {
                title: "Namespace",
                dataIndex: "namespace",
                key: "namespace",
                filters: null,
                filteredValue: filteredInfo.namespace,
                onFilter: (value: any, record: { namespace: string | any[] }) => record.namespace.includes(value),
                sorter: (a: { namespace: string | any[] }, b: { namespace: string | any[] }) => a.namespace.length - b.namespace.length,
                sortOrder: sortedInfo.columnKey === "namespace" && sortedInfo.order,
                ellipsis: true,
                render:(namespace)=><h3>{namespace}</h3>
            },
            {
                title: "Type",
                dataIndex: "type",
                key: "type",
                filters: null,
                filteredValue: filteredInfo.type,
                onFilter: (value: any, record: { type: string | any[] }) => record.type.includes(value),
                sorter: (a: { type: string | any[] }, b: { type: string | any[] }) => a.type.length - b.type.length,
                sortOrder: sortedInfo.columnKey === "type" && sortedInfo.order,
                ellipsis: true,
                render:(type)=><Tag style={{background:'#001529', borderRadius:5, color:'#fff',fontWeight:500}}>{type.toUpperCase()}</Tag>
            },
            {
                title: "Doc",
                dataIndex: "doc",
                key: "doc",
                filters: null,
                filteredValue: filteredInfo.doc,
                onFilter: (value: any, record: { doc: string | any[] }) => record.doc.includes(value),
                sorter: (a: { doc: string | any[] }, b: { doc: string | any[] }) => a.doc.length - b.doc.length,
                sortOrder: sortedInfo.columnKey === "doc" && sortedInfo.order,
                ellipsis: true,
                render:(doc)=><h3>{doc}</h3>
            },
            {
                title: "Fields",
                dataIndex: "fields",
                key: "fields",
                ellipsis: true,
                render: (fields: any) => {
                    return (
                        <React.Fragment>
                            <Tree>
                                {renderTreeNodes(fields)}
                            </Tree>
                        </React.Fragment>
                    );
                },
            },
        ];
        return (

            <React.Fragment>
                <Row>

                    <Col xl={21}><Table columns={columns}

                                        dataSource={this.state.metadata.items}
                                        bordered
                                        locale={{
                                            emptyText: <Empty image={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
                                                <Spin tip="Loading..." size="large"/>
                                            </div>}
                                                              description=""

                                            />}}
                                        onChange={this.handleChange}/></Col>
                    <Col xl={3}>
                        <Row style={{paddingLeft: 5}}>
                            {/*<Col xl={24} style={{marginBottom: 5}}>*/}
                            {/*    <Button*/}
                            {/*        style={{width: ' 100%',fontWeight:500}}*/}
                            {/*        type={this.state.activeButton === 'age' ? "primary" : 'ghost'}*/}
                            {/*        onClick={this.setAgeSort}>Sort age</Button>*/}
                            {/*</Col>*/}
                            {/*<Col xl={24} style={{marginBottom: 5}}>*/}
                            {/*    <Button*/}
                            {/*        style={{width: ' 100%',fontWeight:500}}*/}
                            {/*        type={this.state.activeButton === 'filter' ? "primary" : 'ghost'}*/}
                            {/*        onClick={this.clearFilters}>Clear filters</Button>*/}
                            {/*</Col>*/}

                            <Col xl={24}>
                                <Button
                                    style={{fontWeight:500}}
                                    type={'ghost'}
                                    onClick={this.clearAll}>Clear filters and sorters</Button>
                            </Col>

                        </Row>

                        <Row style={{paddingLeft: 5}}>
                            <Col xl={24} style={{marginBottom: 5,textAlign:'center',marginTop:18}}>
                                <Button type={'primary'} style={{width:'100%',fontWeight:500}}>
                                    <RouterLink to={'/feature'}>
                                      JOIN DATASET <RightOutlined />
                                    </RouterLink>
                                </Button>
                            </Col>
                        </Row>

                    </Col>
                </Row>

            </React.Fragment>

        );
    }
}
