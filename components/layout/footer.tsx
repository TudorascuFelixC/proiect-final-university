import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-row justify-evenly items-center p-4 bg-slate-500 rounded-tl-3xl w-4/6">
        <div className="flex flex-col items-center">
          <>Study</>
          <Link href="#">Succeed@Solent</Link>
          <Link href="#">Referencing</Link>
          <Link href="#">Subject Guides</Link>
          <Link href="#">Library</Link>
        </div>
        <div className="flex flex-col items-center">
          <>Organise</>

          <Link href="#">Email</Link>
          <Link href="#">Timetables</Link>
          <Link href="#">Term Dates</Link>
          <Link href="#">Portal</Link>
        </div>
        <div className="flex flex-col items-center">
          <>Support</>
          <Link href="#">Student Hub</Link>
          <Link href="#">IT & Media</Link>
          <Link href="#">Printing</Link>
          <Link href="#">Extenuating Circumstances</Link>
        </div>
        <div className="flex flex-col items-center">
          <>Solent futures</>
          <Link href="#">Careers</Link>
          <Link href="#">Employers</Link>
          <Link href="#">Alumni</Link>
          <Link href="#">Staff</Link>
        </div>
      </div>
    </div>
  );
}
