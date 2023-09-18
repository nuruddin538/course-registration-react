import { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import { BiBookOpen } from 'react-icons/Bi';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [remaining, setRemaining] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [remainingCredit, setRemainingCredit] = useState(0);
  useEffect(() => {
    fetch('./course.json')
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);
  const handleSelectCourse = course => {
    const isExist = selectedCourses.find(item => item.id == course.id);
    let count = course.price;
    let credit = course.credit;
    // console.log(isExist);
    if (isExist) {
      return alert('already booked');
    } else {
      selectedCourses.forEach(item => {
        count = count + item.price;
        credit = credit + item.credit;
      });
      // console.log(count);
      const totalRemaining = 100000 - count;
      if (count > 100000) {
        return alert("Don't have enough price");
      } else {
        setTotalCost(count);
        setRemaining(totalRemaining);
        setSelectedCourses([...selectedCourses, course]);
      }
      const totalCredit = credit;
      const remainingCredit = 20 - credit;
      if (credit > 20) {
        return alert("Don't have enough credit");
      } else {
        setTotalCredit(totalCredit);
        setRemainingCredit(remainingCredit);
      }
      // console.log(totalRemaining);
    }
  };
  //   console.log(selectedCourses);
  //   console.log(courses);
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold text-center mt-8">
        Course-Registration
      </h1>
      <div className="container mx-auto md:flex md:justify-between gap-5 mt-5 py-10">
        <div className=" md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map(course => (
            <div
              key={course.id}
              className="card w-64 lg:w-80 bg-base-100 shadow-xl"
            >
              <figure className="px-3 pt-5">
                <img src={course.cover} alt="" className="rounded-xl" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{course.title}</h2>
                <p>{course.description}</p>
                <div className="flex justify-between my-3">
                  <div>$ Price: {course.price}</div>
                  <div className="flex items-center gap-3">
                    <span>
                      <BiBookOpen />
                    </span>
                    <span>Credit: {course.credit}hr</span>
                  </div>
                </div>
                <button
                  onClick={() => handleSelectCourse(course)}
                  className="btn btn-primary block"
                >
                  {course.button}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="w-72 h-auto bg-slate-300 p-5 rounded-lg">
          <Cart
            selectedCourses={selectedCourses}
            remaining={remaining}
            totalCost={totalCost}
            totalCredit={totalCredit}
            remainingCredit={remainingCredit}
          ></Cart>
        </div>
      </div>
    </div>
  );
};

export default Home;
