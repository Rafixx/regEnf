// CustomLayout.jsx
import React from 'react';
import { Flex, Tag, Layout, Space, Switch, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Header from './header';
import Footer from './footer';

import '../../assets/css/app.css'
import { useUser } from '../../context/UserContext';
import { useIncidencia } from '../../context/IncidenciaContext';


const { Header: AntHeader, Content, Footer: AntFooter } = Layout;
const AppLayout = ({ children }) => {
  const { user } = useUser();
  const { setFilterByPlanta } = useIncidencia();
  return(
    <Layout className='layout-style' >
      <div className="top-bar">
        <Space size={'large'}>
          {/* <Tag>Usuario: {user && user.username ? user.username : ' DESCONOCIDO '}</Tag> */}
          <Flex gap="4px 0" wrap>
            <Tag icon={<UserOutlined />} >
              Usuario: {user && user.username ? user.username : ' DESCONOCIDO '}
            </Tag>
          </Flex>
          <Switch 
            checkedChildren="Filtrar por PLANTA" 
            unCheckedChildren="TODAS las plantas" 
            defaultChecked 
            onChange={(checked) => setFilterByPlanta(checked)}
          />
        </Space>
      </div>

      <AntHeader className='header-style' >
        <Header />
      </AntHeader>
      <Content className='content-style' >
        {children}
      </Content>
      <AntFooter className='footer-style' >
        <Footer />
      </AntFooter>
    </Layout>
  )}

export default AppLayout;
