import { Outlet, useNavigate } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, Chip } from "@nextui-org/react";

import logo from '/icon.png'
import { NextUIProvider } from "@nextui-org/react";

import useAuthInfo from "../hooks/useAuthInfo";
import { useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { CiMenuBurger } from "react-icons/ci";

export default function DashboardLayout() {

    const navigate = useNavigate();
    const { username, isAdmin, isCreator, isReader } = useAuthInfo();
    const [expanded, setExpanded] = useState<boolean>(false);

    return <>
        <NextUIProvider navigate={navigate}>
            <Navbar className="shadow-lg w-full flex" >
                <NavbarBrand>
                    <div className="flex gap-6 justify-center items-center">
                        <CiMenuBurger className="cursor-pointer" size={30} onClick={() => {
                            setExpanded(v => !v)
                        }} />
                        <Link href="/" className="select-none">
                            <img src={logo} width={50} />
                            <p className="font-bold text-inherit ml-2"></p>
                        </Link>
                    </div>
                </NavbarBrand>
             
                <NavbarContent justify="end">
                    <NavbarItem className="select-none">
                        {username}
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            <div className="flex w-full">
            {expanded && <Sidebar>
                    <Menu>
                        {isAdmin && <>
                            
                            <MenuItem className="mt-3">
                            <Chip color="danger">
                                Administrador
                            </Chip>
                            </MenuItem>

                            <MenuItem onClick={()=>{
                            navigate('/dashboard/categories')
                        }}>
                            Categorías
                        </MenuItem>
                        <MenuItem onClick={()=>{
                            navigate('/dashboard/topics')
                        }}>
                            Tematicas
                        </MenuItem>
                        </>}
                        {(isReader || isCreator) && 
                        <>
                        <MenuItem>
                            <Chip color={isReader ? 'default' : 'primary'}>
                                {isReader ? 'Lector' : 'Creador'}
                            </Chip>
                        </MenuItem>
                        <MenuItem onClick={()=>{
                            navigate('/dashboard/content')
                        }}>
                            Contenido
                        </MenuItem>
                        </>}
                        <MenuItem onClick={()=>{
                            navigate('/dashboard/logout')
                        }}>
                            Salir
                        </MenuItem>
                    </Menu>
                </Sidebar>}
                <div className="p-6 w-full">
                <Outlet />
                </div>
            </div>
            <div>
            </div>
        </NextUIProvider>
    </>
}