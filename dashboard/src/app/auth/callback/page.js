'use client'

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { RocketIcon } from "@radix-ui/react-icons"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { Clipboard, CopySimple } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

const YourCodePage = () => {
    const [code, setCode] = useState(null)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const codeParam = urlParams.get('code')
        setCode(codeParam)
    }, [])

    const handleCopiedClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Code copied to clipboard!');
        }).catch((error) => {
            console.error('Failed to copy text: ', error);
        });
    }
    return (
        <div className="mt-28 mx-auto w-[20rem]">
            <Alert>
                <RocketIcon className="h-4 w-4" />
                <AlertTitle><p className="">Your Code!</p></AlertTitle>
                <AlertDescription>
                    <div className="flex items-center justify-between gap-7">
                        <p>{code}.</p>
                        <span onClick={() => handleCopiedClipboard(code)} className="cursor-pointer p-1 border rounded-md hover:bg-gray-100"><Clipboard  className="h-4 w-4" /></span>
                    </div>
                </AlertDescription>
            </Alert>
        </div>
    )
}

export default YourCodePage;