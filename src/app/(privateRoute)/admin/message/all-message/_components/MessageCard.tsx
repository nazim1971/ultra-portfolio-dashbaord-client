"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Mail, User, MessageSquare, Tag, Eye, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TMessage } from "@/types";



const MessageCard = ({ message }: {message: TMessage}) => {
  return (
    <Card className="rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition-all dark:bg-[#111]">
      <CardHeader className="p-4 pb-2">
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
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Tag className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{message.subject}</span>
        </div>

        <div className="bg-muted/50 p-3 rounded-lg">
          <div className="flex items-start gap-2">
            <MessageSquare className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
            <p className="text-sm text-muted-foreground line-clamp-3">
              {message.message}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 text-xs text-muted-foreground">
        Received: {new Date(message.createdAt).toLocaleDateString()}
       
      </CardFooter>
    </Card>
  );
};

export default MessageCard;