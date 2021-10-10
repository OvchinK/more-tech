import {useForm} from 'effector-forms'
import {useStore} from 'effector-react'
import {loginForm, loginFx} from "./model";
import {Form, Input, Button, Row, Col, Typography} from 'antd';
import {useEffect} from "react";
import {useHistory} from 'react-router-dom';

import {UserOutlined, LockOutlined} from '@ant-design/icons'

const LoginForm = () => {
    const {fields, submit, eachValid} = useForm(loginForm)
    const pending = useStore(loginFx.pending)
    const history = useHistory();

    //TODO: remove it
    useEffect(() => {
        if (fields.email['value'] === 'root' && fields.password['value'] === 'root') {
            history.push('/home');
        }
    }, [fields.email['value'], fields.password['value']])


    const onSubmit = (e: any) => {
        if (fields.email['value'] === 'root' && fields.password['value'] === 'root') {
            history.push('/home');
        }
        e.preventDefault()
        submit()
    }

    return (
        <Col>
            <Row>
                <Col xl={21}
                     style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <img src="/src/img/logo.png" style={{width: 150}} alt=""/>
                    <span style={{fontSize: '32px', color: 'rgb(10, 40, 150)', fontWeight: 700}}>Dataset
                        builder</span>
                </Col>
                <Col xl={21} style={{marginTop: 25}}>
                    <Form
                        // @ts-ignore
                        onSubmit={onSubmit}
                        name="basic"
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        initialValues={{remember: true}}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="username"
                            rules={[{required: true, message: 'Please input your username!'}]}
                        >
                            <Input
                                prefix={<UserOutlined/>}
                                style={{borderRadius: '30px', padding: 15}}
                                type="text"
                                value={fields.email.value}
                                disabled={pending}
                                placeholder="LOGIN"
                                onChange={(e) => fields.email.onChange(e.target.value)}
                            ></Input>
                            <div>

                                {fields.email.errorText({
                                    "email": "enter email",
                                })}
                            </div>
                        </Form.Item>

                        <Form.Item

                            name="password"
                            rules={[{required: true, message: 'Please input your password!'}]}
                        >
                            <Input
                                style={{borderRadius: '30px', padding: 15}}
                                type="password"
                                prefix={<LockOutlined/>}
                                placeholder={`PASSWORD`}
                                value={fields.password.value}
                                disabled={pending}
                                onChange={(e) => fields.password.onChange(e.target.value)}
                            />
                            <div>
                                {fields.password.errorText({
                                    "required": "password required"
                                })}
                            </div>

                        </Form.Item>
                        <Form.Item wrapperCol={{span: 24}}>
                            <Button
                                style={{
                                    borderRadius: '30px', width: '100%',
                                    height: 50,
                                    background: '#0a2896', color: '#fff',
                                    fontSize: 20,
                                    fontWeight: 500
                                }}
                                disabled={!eachValid || pending}
                                // @ts-ignore
                            >
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>


        </Col>

    )
}

export default LoginForm