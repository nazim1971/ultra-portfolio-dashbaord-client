/* eslint-disable @typescript-eslint/no-explicit-any */
// components/MessageDetailsModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, User, MessageSquare, Tag, Eye, EyeOff,  } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function MessageDetailsModal({
  message,
  open,
  onClose,
}: {
  message: any;
  open: boolean;
  onClose: () => void;
}) {
  if (!message) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Message Details</span>
            {/* <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button> */}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                <User className="w-5 h-5" />
                {message.name}
              </h3>
              <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                <Mail className="w-4 h-4" />
                {message.email}
              </p>
            </div>
            <Badge variant={message.viewed ? "default" : "secondary"}>
              {message.viewed ? (
                <Eye className="w-4 h-4 mr-1" />
              ) : (
                <EyeOff className="w-4 h-4 mr-1" />
              )}
              {message.viewed ? "Viewed" : "New"}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Tag className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{message.subject}</span>
          </div>

          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="flex items-start gap-2">
              <MessageSquare className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                {message.message}
              </p>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            Received: {new Date(message.createdAt).toLocaleString()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}