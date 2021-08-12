import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
import EqualizerIcon from '@material-ui/icons/Equalizer';

const Aside = ({ lists }) => {
    const pathName = useLocation().pathname;
    const slotUrls = lists.map(obj => obj.slotUrl);
    console.log('Aside', slotUrls);

    return (
        <ProSidebar>
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
                        icon={<EqualizerIcon />}
                        suffix={false}
                        active={'/' === pathName}
                    >
                        Overview
                        <Link to="/" />
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
                                        width="80%"
                                    />
                                }
                            >
                                {list.sectionList.map(obj => {
                                    const key = Object.keys(obj);
                                    const currentPathName = `/${list.key}/${key}`;
                                    return (
                                        <MenuItem
                                            className="MenuItem"
                                            key={key}
                                            active={pathName === currentPathName}
                                        >
                                            {obj[key].displayName}
                                            <Link
                                                to={{
                                                    pathname: currentPathName,
                                                    state: {
                                                        serverURL: list.serverURL,
                                                        parkingLotInfoURL: list.parkingLotInfo,
                                                        realBeaconURL: list.beaconCollector
                                                    }
                                                }}
                                            />
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
                                        width="80%"
                                    />
                                }
                                active={`/${list.key}` === pathName}
                            >
                                {list.title}
                                <Link
                                    to={{
                                        pathname: `/${list.key}`,
                                        state: {
                                            serverURL: list.serverURL,
                                            parkingLotInfoURL: list.parkingLotInfo,
                                            imageSource: list.imageSource2,
                                            realBeaconURL: list.beaconCollector
                                        }
                                    }}
                                />
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
