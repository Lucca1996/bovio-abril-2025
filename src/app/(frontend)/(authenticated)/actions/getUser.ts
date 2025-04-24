"use server";

import {headers as getHeaders} from "next/headers";
import {getPayload} from "payload";
import configPromise from "@payload-config";
import type {Payload} from "payload";
import {Customer} from "@/payload-types";

export async function getUser(): Promise<Customer|null> {
    try {
        const headers = await getHeaders();
        const payload: Payload = await getPayload({config: await configPromise})
        const { user } = await payload.auth({headers});
        
        if (!user || user.collection !== 'customers') {
            return null;
        }
        
        return user as Customer;
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
} 