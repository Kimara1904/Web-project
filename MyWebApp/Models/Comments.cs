using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyWebApp.Models
{
    public class Comments
    {
        public static List<Comment> CommentList = HttpContext.Current.Application["comments"] as List<Comment>;

        public static Comment AddComment(Comment comment)
        {
            CommentList.Add(comment);
            ReadAndWriteModels.WriteComments(CommentList);
            return comment;
        }

        public static void UnapproveComment(Comment comment)
        {
            comment.Approved = false;
            ReadAndWriteModels.WriteComments(CommentList);
        }

        public static void ApproveComment(Comment comment)
        {
            comment.Approved = true;
            ReadAndWriteModels.WriteComments(CommentList);
        }
    }
}