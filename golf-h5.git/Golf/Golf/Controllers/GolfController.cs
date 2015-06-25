using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Configuration;

namespace Golf.Controllers
{
    public class GolfController : Controller
    {

        //
        // GET: /Golf/


        public ActionResult Default()
        {
            Response.Redirect("index.html");//TODO
            Response.End();
            return null;
        }


        public ActionResult Index()
        {
            var url = ConfigurationManager.AppSettings["WebresourceBaseUrl"];
            return View();
        }



        public ActionResult List()
        {
            return View();
        }

        public ActionResult City()
        {
            return View();
        }

        public ActionResult RecommLanding()
        {
            return View();
        }

        //
        // GET: /Golf/Details/5

        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /Golf/Create

        public ActionResult Create()
        {
            return View();
        } 

        //
        // POST: /Golf/Create

        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
        
        //
        // GET: /Golf/Edit/5
 
        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /Golf/Edit/5

        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here
 
                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Golf/Delete/5
 
        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /Golf/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here
 
                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
