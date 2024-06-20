import { Clock } from "lucide-react";
import FilterBar from "./FilterBar.class"
import { Separator } from "@/shdcn/components/ui/separator";
import RandomColors from "@/Pages/Classes/Landing/Components/Cards/Class/data/ColorCombos.class";

const Schedule_Details = () => {
  return (
    <div className="flex flex-col w-full bg-[var(--box)] rounded-md p-6 gap-4">
          {/* Filter Bar */}
        <FilterBar/>

        <Separator  />
		  <div className="flex gap-4 flex-wrap">

        {
          Array(7).fill("as_s").map((_,i)=>{
            return <div className="flex flex-col w-[30%] bg-[var(--primary)] rounded-md shadow ">
                  <div style={{backgroundColor:RandomColors[i%RandomColors.length]}} className={`w-full h-2  rounded-tl-md rounded-tr-md `}></div>
                  <div className="flex w-full gap-2 flex-wrap">
									<div className="p-2">
										<h1 className="hFont text-lg font-semibold leading-tight">Basic Algorithm</h1>
										<p className="text-dark font-medium mb-1">Kayley watson</p>
										<div className="d-flex align-items-center justify-content-between">
											<div>
												<ul>
												
													<li className="flex gap-2 text-sm items-center">
											<Clock size={16} className="text-danger"/>
                      <p> 09.00 - 10.00 AM </p>
                      
                      </li>
												</ul>
											</div>
											<div>
												<img src="images/avatar/1.jpg" className="avatar avatar-lg" alt=""/>
											</div>
										</div>
                    </div>
                    </div>
								</div>
          })
        }
        </div>
        </div>
  )
}

export default Schedule_Details