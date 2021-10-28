import { v4 as uuid } from "uuid" 

export const CareerForm = ({addJob}) =>
{
  function handleAddJob(e) {
    e.preventDefault();
    const formData = e.target.elements;

    const job = {
      title: formData["title"].value,
      department: formData["department"].value,
      level: formData["level"].value,
      summary: formData["summary"].value,
      headcount: formData["headcount"].value,
      _id: uuid(),
    };

    addJob(job);
  }

  return(
    <form
      onSubmit={handleAddJob}
      className="p-3"
    >
      <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 p-3">
        <div className="text-xl mb-3">Add Job Posting</div>
        <div className="space-y-5">
          <div>
            <label className="block text-sm" htmlFor="title">
              Job Title
            </label>
            <input type="text" name="title" id="title" />
          </div>
          <div>
            <label className="block text-sm" htmlFor="level">
              Level
            </label>
            <select name="level" id="level">
              <option value="internship">Internship</option>
              <option value="entry">Entry</option>
              <option value="experienced">Experienced</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <div>
            <label className="block text-sm" htmlFor="department">
              Department
            </label>
            <input type="text" name="department" id="department" placeholder="e.g. Engineering" />
          </div>
          <div>
            <label className="block text-sm" htmlFor="summary">
              Summary
            </label>
            <textarea name="summary" id="summary" />
          </div>
          <div>
            <label className="block text-sm" htmlFor="headcount">
              Headcount
            </label>
            <input type="number" name="headcount" id="headcount" />
          </div>
          <div>
            <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
              ADD
            </button>
          </div>
        </div>
      </div>
    </form>
  )

  // return (
  //   <form id="career-form" onSubmit={handleAddJob}>
  //     <div class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
  //       <div class="px-4 py-5 sm:px-6 text-lg">Add Job Posting</div>
  //       <div class="px-4 py-5 sm:p-6">
  //         <div class="space-y-5">
  //           <div class="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start">
  //             <label for="job-title" className="block text-sm">
  //               Job Title
  //             </label>
  //             <div class="mt-1 sm:mt-0 sm:col-span-2">
  //               <input
  //                 type="text"
  //                 name="job-title"
  //                 id="job-title"
  //                 required="required"
  //                 class="block w-full shadow-sm sm:text-sm focus:ring-pink-500 focus:border-pink-500 border-gray-300 rounded-md"
  //               />
  //             </div>
  //           </div>

  //           <div class="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start">
  //             <label for="job-level" className="block text-sm">
  //               Level
  //             </label>
  //             <div class="mt-1 sm:mt-0 sm:col-span-2">
  //               <select
  //                 id="job-level"
  //                 name="job-level"
  //                 required="required"
  //                 class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md"
  //               >
  //                 <option value="internship">Internship</option>
  //                 <option value="entry">Entry</option>
  //                 <option value="experienced">Experienced</option>
  //                 <option value="manager">Manager</option>
  //               </select>
  //             </div>
  //           </div>

  //           <div class="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start">
  //             <label for="job-department" className="block text-sm">
  //               Department
  //             </label>
  //             <div class="mt-1 sm:mt-0 sm:col-span-2">
  //               <input
  //                 type="text"
  //                 name="job-department"
  //                 id="job-department"
  //                 required="required"
  //                 placeholder="e.g. Engineering"
  //                 class="block w-full shadow-sm sm:text-sm focus:ring-pink-500 focus:border-pink-500 border-gray-300 rounded-md"
  //               />
  //             </div>
  //           </div>

  //           <div class="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start">
  //             <label for="job-summary" className="block text-sm">
  //               Summary
  //             </label>
  //             <div class="mt-1 sm:mt-0 sm:col-span-2">
  //               <textarea
  //                 id="job-summary"
  //                 name="job-summary"
  //                 rows="4"
  //                 required="required"
  //                 class="block w-full shadow-sm sm:text-sm focus:ring-pink-500 focus:border-pink-500 border border-gray-300 rounded-md"
  //               ></textarea>
  //             </div>
  //           </div>

  //           <div class="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start">
  //             <label for="headcount" className="block text-sm">
  //               Headcount
  //             </label>
  //             <div class="mt-1 sm:mt-0 sm:col-span-2">
  //               <div class="relative w-32">
  //                 <button
  //                   type="button"
  //                   class="
  //                     absolute
  //                     left-0
  //                     inset-y-0
  //                     px-1.5
  //                     text-gray-400
  //                     "
  //                   id="headcount-minus-btn"
  //                 >
  //                   <svg
  //                     class="w-6 h-6"
  //                     fill="none"
  //                     stroke="currentColor"
  //                     viewBox="0 0 24 24"
  //                     xmlns="http://www.w3.org/2000/svg"
  //                   >
  //                     <path
  //                       stroke-linecap="round"
  //                       stroke-linejoin="round"
  //                       stroke-width="2"
  //                       d="M20 12H4"
  //                     ></path>
  //                   </svg>
  //                 </button>
  //                 <input
  //                   type="text"
  //                   name="headcount"
  //                   id="headcount"
  //                   required="required"
  //                   class="block w-full px-9 text-center shadow-sm sm:text-sm focus:ring-pink-500 focus:border-pink-500 border-gray-300 rounded-md"
  //                   value="1"
  //                   readonly=""
  //                 />
  //                 <button
  //                   type="button"
  //                   class="
  //                     absolute
  //                     right-0
  //                     inset-y-0
  //                     px-1.5
  //                     text-gray-400
  //                     "
  //                   id="headcount-plus-btn"
  //                 >
  //                   <svg
  //                     class="w-6 h-6"
  //                     fill="none"
  //                     stroke="currentColor"
  //                     viewBox="0 0 24 24"
  //                     xmlns="http://www.w3.org/2000/svg"
  //                   >
  //                     <path
  //                       stroke-linecap="round"
  //                       stroke-linejoin="round"
  //                       stroke-width="2"
  //                       d="M12 6v6m0 0v6m0-6h6m-6 0H6"
  //                     ></path>
  //                   </svg>
  //                 </button>
  //                 <div
  //                   id="headcount-error"
  //                   class="text-red-500 text-xs pt-1 hidden"
  //                 ></div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div class="px-4 py-4 sm:px-6 text-right">
  //         <button
  //           class="
  //             inline-flex
  //             justify-center
  //             py-2
  //             px-4
  //             border border-transparent
  //             shadow-sm
  //             text-sm
  //             font-medium
  //             rounded-md
  //             text-white
  //             bg-pink-600
  //             hover:bg-pink-700
  //             focus:outline-none
  //             focus:ring-2
  //             focus:ring-offset-2
  //             focus:ring-pink-500
  //             "
  //         >
  //           ADD
  //         </button>
  //       </div>
  //     </div>
  //   </form>
  // );


}