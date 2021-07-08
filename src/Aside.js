import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import logo from './logo.png';
import { FcDoughnutChart } from 'react-icons/fc';

const Aside = ({ lists }) => {
    return (
        <ProSidebar style={{ height: '100vh' }}>
            <SidebarHeader>
                <div
                    style={{
                        padding: '10%'
                    }}
                >
                    <a href="http://www.watchmile.com/">
                        <img width="60%" src={logo} alt="logo" />
                    </a>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="square">
                    <MenuItem
                        className="MenuItem"
                        icon={<FcDoughnutChart size="100%" />}
                        suffix={false}
                    >
                        Overview
                        <NavLink exact to="/" />
                    </MenuItem>
                </Menu>
                <Menu iconShape="square">
                    {lists.map(list =>
                        list.sectionListType === 'floor' ? (
                            <SubMenu
                                className="SubMenu"
                                key={list.key}
                                title={list.title}
                                icon={
                                    <img
                                        src={list.iconLink}
                                        alt={`${list.title} img`}
                                        width="100%"
                                    />
                                }
                            >
                                {list.sectionList.map(obj => {
                                    const key = Object.keys(obj);
                                    return (
                                        <MenuItem className="MenuItem" key={key}>
                                            {obj[key].displayName}
                                            <NavLink to={`/${list.key}/${key}`} />
                                        </MenuItem>
                                    );
                                })}
                            </SubMenu>
                        ) : (
                            <MenuItem
                                className="MenuItem"
                                key={list.key}
                                icon={
                                    <img
                                        src={list.iconLink}
                                        alt={`${list.title} img`}
                                        width="100%"
                                    />
                                }
                            >
                                {list.title}
                                <NavLink to={`/${list.key}`} />
                            </MenuItem>
                        )
                    )}
                </Menu>
            </SidebarContent>
            <SidebarFooter>
                <div>footer</div>
            </SidebarFooter>
        </ProSidebar>
    );
};

export default Aside;
