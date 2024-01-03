import {
    useToast, Button, Flex, FormLabel, Heading, Input
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { auth, database } from '../config/firebase'
import { push, ref, set } from 'firebase/database';

export function Admin() {
    const [addAdmin, setAddAdmin] = useState("")
    const [addCreator, setAddCreator] = useState("")
    const toast = useToast({
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    function addRole(roles: string, creatorID: string | undefined) {
        try {
            if (!creatorID) {
                toast({ title: `No User ID Provided`, status: "error" })
                return;
            }
            push(ref(database, `roles/${roles}`), creatorID)
            toast({ title: `Added User: ${creatorID} to ${roles}`, status: "success" })
            setAddAdmin("")
            setAddCreator("")
        } catch (error) {
            console.error('Error Saving:', error);
        }
    }

    return (
        <>
            <Heading>Welcome Back, {auth.currentUser?.displayName ?? auth.currentUser?.email ?? undefined}</Heading>
            <Flex flexDirection={"row"} justifyContent="space-between" my={3} flexWrap={"wrap"} >
                <Flex flexDirection={"column"} w="300px">
                    <Button onClick={(() => addRole("admins", addAdmin))}>Add new Admin</Button>
                    <br />
                    <FormLabel>Add new Admin with User ID</FormLabel>
                    <Input placeholder="Add new Admin" value={addAdmin} onChange={((e) => setAddAdmin(e.target.value))} />
                    {addAdmin}
                </Flex>
                <Flex flexDirection={"column"} w="300px">
                    <Button onClick={(() => addRole("creators", addCreator))}>Add new Admin</Button>
                    <br />
                    <FormLabel>Add new Creator with User ID</FormLabel>
                    <Input placeholder="Add new Admin" value={addCreator} onChange={((e) => setAddCreator(e.target.value))} />
                    {addCreator}
                </Flex>
            </Flex>

        </>
    )
}