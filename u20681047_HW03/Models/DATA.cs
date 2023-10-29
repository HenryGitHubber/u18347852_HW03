using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace u18347852_HW03.Models
{
    public static class DATA
    {
        public static List<DataPoint> GetBorrowCountForBooks(DateTime startDate, DateTime endDate)
        {
            string connectionString = "Data Source=DESKTOP-GQBUDQ9\\SQLEXPRESS;Initial Catalog = Library; Integrated Security = True"
; // Replace with your actual database connection string

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                List<DataPoint> result = new List<DataPoint>();

                connection.Open();

                // Create a SQL query to count borrows for each book within the specified date range.
                string sqlQuery = @"
                    SELECT b.bookid, b.name AS book_name, COUNT(borrows.borrowId) AS borrow_count
                    FROM books b
                    LEFT JOIN borrows ON b.bookid = borrows.bookid
                    WHERE borrows.broughtDate >= borrows.takenDate
                    GROUP BY b.bookid, b.name
                    ORDER BY borrow_count DESC;
                ";

                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    command.Parameters.Add(new SqlParameter("@StartDate", startDate));
                    command.Parameters.Add(new SqlParameter("@EndDate", endDate));

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            int bookId = (int)reader["bookid"];
                            string bookName = (string)reader["book_name"];
                            int borrowCount = (int)reader["borrow_count"];
                            result.Add(new DataPoint(borrowCount, bookName));
                        }
                    }
                }

                return result;
            }
        }

    }
   
}