import { useAppSelector } from "@/app/ReduxHooks";
import { IstudentShort } from "@/app/Types/IstudentsDir.t";
import RoleBasedAccess from "@/Global/Middleware Hooks/RoleBasedAccess";
import { TableCell, TableRow } from "@/shdcn/components/ui/table";
import { History, Mail, Phone } from "lucide-react";
import { FC } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { Link } from "react-router-dom";

const StudentsTableRow: FC<{ data: IstudentShort }> = ({ data }) => {
  const { Classes, Sections } = useAppSelector((s) => s.global);
  return (
    <TableRow>
      <TableCell className=" text-base font-bold whitespace-nowrap">
        {data.FirstName} {data.LastName}
      </TableCell>
      <TableCell className="font-bold">#{data.GRNO}</TableCell>
      <TableCell className=" font-semibold">{data.fatherName}</TableCell>
      <TableCell className="font-bold">{data.RollNo}</TableCell>
      <TableCell className=" font-medium">{data.DOA}</TableCell>
      <TableCell className="flex gap-x-4 justify-start">
        <a
          href={`https://mail.google.com/mail/?view=cm&to=${data?.email}`}
          target="_blank"
          className="p-2 cursor-pointer transition-colors hover:bg-[var(--dark)] hover:text-white bg-[var(--bg)] text-[var(--dark)] rounded-full aspect-square"
        >
          <Mail size={18} />
        </a>
        <a
          href={
            data.WA
              ? `https://wa.me/+92${data?.WA?.split("92")[1] || data.WA}`
              : `tel:+92${data?.contact[0]?.split("+92")[1] || data.contact[0]}`
          }
          target="_blank"
          className={`p-2 cursor-pointer transition-colors hover:bg-[var(--dark)] hover:text-white bg-[var(--bg)] text-[var(--dark)] rounded-full aspect-square`}
        >
          {data.WA ? <FaWhatsapp size={18} /> : <Phone size={18} />}
        </a>
      </TableCell>
      <TableCell className="">
        <Link
          to={"/dashboard"}
          className="bg-darker center text-white rounded-full px-2 py-1.5"
        >
          {Classes[data?.CurrentClass]}
        </Link>
      </TableCell>
      <TableCell className="font-bold text-center center">
        {Sections?.[data.CurrentClass]?.[data?.CurrentSection]}
      </TableCell>

      <TableCell className=" ">
        <div className="flex gap-2">
          <RoleBasedAccess roleToGiveAccess={["admin","chief admin"]}>
            <Link
              to={`/students/history/${data._id}`}
              className="center text-dark dark:text-light"
            >
              <History size={22} />
            </Link>
          </RoleBasedAccess>
          <Link
            to={`/students/${data.GRNO}`}
            className="center text-dark dark:text-light"
          >
            <ImProfile size={22}/>
          </Link>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default StudentsTableRow;
