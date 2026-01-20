"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { ContactMessage } from "@/types/contact"
import { getContactMessages } from "@/services/contactMessageService"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { useIsMobile } from "@/hooks/use-mobile"

function MessageDrawer({ message }: { message: ContactMessage }) {
  const isMobile = useIsMobile()
  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">View</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{message.subject}</DrawerTitle>
          <DrawerDescription>{message.email}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4 space-y-2">
          <p className="text-sm"><span className="font-semibold">From:</span> {message.name} ({message.email})</p>
          <p className="text-sm"><span className="font-semibold">Received:</span> {new Date(message.createdAt).toLocaleString()}</p>
          <p className="text-sm whitespace-pre-wrap border rounded-md p-3 bg-muted/40">{message.message}</p>
        </div>
        <DrawerFooter>
          <DrawerClose asChild><Button variant="outline">Close</Button></DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default function ContactMessagesTable() {
  const [search, setSearch] = React.useState("")
  const { data = [], isLoading } = useQuery<ContactMessage[]>({
    queryKey: ["contact-messages"],
    queryFn: getContactMessages,
  })

  const filtered = data.filter((msg) => {
    const term = search.toLowerCase();
    return (
      !term ||
      msg.name.toLowerCase().includes(term) ||
      msg.email.toLowerCase().includes(term) ||
      msg.subject.toLowerCase().includes(term)
    )
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input placeholder="Search by name, email, or subject" value={search} onChange={(e) => setSearch(e.target.value)} className="w-80" />
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Subject</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Created</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} className="py-8 text-center">Loading...</td></tr>
            ) : filtered.length ? filtered.map((msg) => (
              <tr key={msg.id} className="border-t">
                <td className="px-4 py-3 text-sm">{msg.name}</td>
                <td className="px-4 py-3 text-sm">{msg.email}</td>
                <td className="px-4 py-3 text-sm">{msg.subject}</td>
                <td className="px-4 py-3 text-sm">{new Date(msg.createdAt).toLocaleString()}</td>
                <td className="px-4 py-3 text-sm"><MessageDrawer message={msg} /></td>
              </tr>
            )) : (
              <tr><td colSpan={5} className="py-8 text-center">No messages.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
