import { Outlet, useNavigate } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import logo from '/icon.png'

import { NextUIProvider } from "@nextui-org/react";

export default function DefaultLayout() {
    const navigate = useNavigate();
    return <>
        <NextUIProvider navigate={navigate}>
            <Navbar className="shadow-lg">
                <NavbarBrand>
                    <Link href="/">
                        <img src={logo} width={50} />
                        <p className="font-bold text-inherit ml-2"></p></Link>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                        <Link href="/login">Ingresar</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button as={Link} color="primary" href="/sign-up" variant="flat">
                            Crear Cuenta
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            <div className="w-full">
                <Outlet />
            </div>
        </NextUIProvider>
    </>
}