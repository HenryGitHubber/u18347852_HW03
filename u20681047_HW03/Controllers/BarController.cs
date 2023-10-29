using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
//using System.Xml.Linq;
using u18347852_HW03.Models;
using GemBox.Document;

namespace u18347852_HW03.Controllers
{
    public class BarController : Controller
    {
        // GET: Bar
        public ActionResult Reporting()
        {
            // Define the start and end dates for the period you want to analyze
            DateTime startDate = new DateTime(2023, 1, 1); // Replace with your desired start date
            DateTime endDate = new DateTime(2023, 12, 31); // Replace with your desired end date

            // Call the GetBorrowCountForBooks method to retrieve the data
            List<DataPoint> borrowData = DATA.GetBorrowCountForBooks(startDate, endDate);

            // Pass the data to the view
            ViewBag.BorrowData = borrowData;

            return View();
        }

        public ActionResult Archives()
        {
            string[] filePaths = Directory.GetFiles(Server.MapPath("~/Documents/"));
            List<FileModel> files = new List<FileModel>();
            foreach (string filePath in filePaths)
            {
                files.Add(new FileModel { FileName = Path.GetFileName(filePath) });
            }
            return View(files);
        }
        public FileResult DownloadFile(string fileName)
        {
            string path = Server.MapPath("~/Documents/") + fileName;
            byte[] bytes = System.IO.File.ReadAllBytes(path);
            return File(bytes, "application/octet-stream", fileName);
        }

        public ActionResult DeleteFile(string fileName)
        {
            string path = Server.MapPath("~/Documents/") + fileName;
            byte[] bytes = System.IO.File.ReadAllBytes(path);


            System.IO.File.Delete(path);

            return RedirectToAction("Reporting");
        }

        public FileResult DisplayFile(string fileName)
        {
            string path = Server.MapPath("~/Documents/") + fileName;
            byte[] bytes = System.IO.File.ReadAllBytes(path);
            return File(bytes, System.Net.Mime.MediaTypeNames.Application.Octet, fileName);
        }

        public ActionResult TinyMCE() => this.View(new FileModel());

        [HttpPost]
        public FileResult SaveReport(FileModel model)
        {
            // If using Professional version, put your serial key below.
            ComponentInfo.SetLicense("FREE-LIMITED-KEY");

            var templateFile = Server.MapPath("~/App_Data/DocumentTemplate.docx");

            // Load template document.
            var document = DocumentModel.Load(templateFile);

            // Insert content from HTML editor.
            var bookmark = document.Bookmarks["HtmlBookmark"];
            bookmark.GetContent(true).LoadText(model.Content, LoadOptions.HtmlDefault);

            // Save document to stream in specified format.
            var saveOptions = GetSaveOptions(model.Extension);
            var stream = new MemoryStream();
            document.Save(stream, saveOptions);

            // Download document.
            var downloadDirectory = Server.MapPath("~/Documents/");
            var downloadFile = $"{model.FileName}{model.Extension}";
            var fullPath = Path.Combine(downloadDirectory, downloadFile);
            System.IO.File.WriteAllBytes(fullPath, stream.ToArray());

            string[] filePaths = Directory.GetFiles(Server.MapPath("~/Documents/"));
            List<FileModel> files = new List<FileModel>();
            foreach (string filePath in filePaths)
            {
                files.Add(new FileModel { FileName = Path.GetFileName(filePath) });
            }
            return File(fullPath, saveOptions.ContentType, downloadFile);
        }

        private static SaveOptions GetSaveOptions(string extension)
        {
            switch (extension)
            {
                case ".docx": return SaveOptions.DocxDefault;
                case ".pdf": return SaveOptions.PdfDefault;
                case ".xps": return SaveOptions.XpsDefault;
                case ".html": return SaveOptions.HtmlDefault;
                case ".mhtml": return new HtmlSaveOptions() { HtmlType = HtmlType.Mhtml };
                case ".rtf": return SaveOptions.RtfDefault;
                case ".xml": return SaveOptions.XmlDefault;
                case ".png": return SaveOptions.ImageDefault;
                case ".jpeg": return new ImageSaveOptions(ImageSaveFormat.Jpeg);
                case ".gif": return new ImageSaveOptions(ImageSaveFormat.Gif);
                case ".bmp": return new ImageSaveOptions(ImageSaveFormat.Bmp);
                case ".tiff": return new ImageSaveOptions(ImageSaveFormat.Tiff);
                case ".wmp": return new ImageSaveOptions(ImageSaveFormat.Wmp);
                default: return SaveOptions.TxtDefault;
            }
        }

    }
}
