import React,{useEffect,useState} from 'react'
import BarChart from './ChartsBars/BarChart'
import downImg from '../Images/vertical_align_bottom.png'

const DashSecond = ({handleSelectChange1,detailsData,tsData,barChartRef,downloadBarChartAsPNG}) => {

    const [filteredData, setFilteredData] = useState(null);
    const [isSectionDropOpen, setIsSectionDropOpen] = useState(false);
    const [checkedSections, setCheckedSections] = useState({});
    const [sectionData, setSectionData] = useState([]);

    useEffect(() => {
        if (tsData && tsData.section_master) {
            const filteredData = {
                section_master: tsData.section_master.filter(
                    (section) => checkedSections[section] 
                ),
                values: [
                    tsData.values[0].filter((_, index) =>
                        checkedSections[tsData.section_master[index]]  
                    ),
                ],
            };

            setFilteredData(filteredData); 
        }
    }, [tsData, checkedSections]);

    const toggleCheckbox = (section) => {
        setCheckedSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    useEffect(() => {
        if (tsData && tsData.section_master) {
            setCheckedSections(
                tsData.section_master.reduce((acc, section) => {
                    acc[section] = true;
                    return acc;
                }, {})
            );

            const data = tsData.section_master.map((section, index) => ({
                name: section,
                percentage: tsData.values[0][index]?.value || 0,
            }));
            setSectionData(data);
        }
    }, [tsData]);

    const toggleDropdown = () => {
        setIsSectionDropOpen((prev) => !prev);
    };
    return (
        <div>
            <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px" }} className="dashSecond px-4 pt-4 mt-3">
                <div className="dashSecHead flex-wrap d-flex">
                    <div className="auditCycle d-flex flex-column">
                        <p className="text-start">Audit Cycle</p>
                        <select onChange={handleSelectChange1}>
                            {detailsData?.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='ms-auto'>
                        <div className="auditCycleRight my-2 ms-auto gap-4 d-flex align-items-center">
                            <div onClick={toggleDropdown} className="addSection d-flex gap-2 justify-content-center align-items-center">
                                <p>Add Section</p>
                                <i className="bi bi-plus-square"></i>
                            </div>

                            <div className="downIcon" onClick={() => downloadBarChartAsPNG(barChartRef)}>
                                <img src={downImg} alt="img" />
                            </div>
                        </div>
                        <div>

                            {isSectionDropOpen && (
                                <ul className="dropdown-menu position-static d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px">
                                    {tsData.section_master.map((section, index) => (
                                        <li key={index}>
                                            <div style={{ cursor: "default" }} className="dropList d-flex justify-content-between align-items-center">
                                                <p className="my-2">{section}</p>
                                                <input type="checkbox" checked={checkedSections[section]} onChange={() => toggleCheckbox(section)} />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}</div>

                    </div>
                </div>

                <div className="dashSecHero justify-content-center row d-flex">
                    <div ref={barChartRef} className="secHeroLeft col-sm-9">
                        <BarChart filteredData={filteredData} />
                    </div>

                    <div className="secHeroSection mt-4 col-sm-3">
                        <div className="secHead">
                            <p>{tsData.title}</p>
                        </div>
                        {sectionData.map((section, index) => {
                            const isFiltered = filteredData?.section_master.includes(section.name);
                            return (
                                <div key={index} className="section1" style={{ color: isFiltered ? "#003C5D" : "#9CA3AF" }}>
                                    <p className="perPara"
                                        style={{
                                            color: isFiltered ? "#003C5D" : "#9CA3AF",
                                        }}
                                    >
                                        {`${section.percentage}%`}
                                    </p>
                                    <p
                                        className="secPara"
                                        style={{
                                            color: isFiltered ? "#003C5D" : "#9CA3AF",
                                        }}
                                    >
                                        {section.name}
                                    </p>
                                </div>
                            );
                        })}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashSecond
