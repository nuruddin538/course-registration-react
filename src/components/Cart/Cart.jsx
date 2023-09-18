import PropTypes from 'prop-types';
const Cart = ({
  selectedCourses,
  remaining,
  totalCost,
  totalCredit,
  remainingCredit,
}) => {
  // console.log(selectedCourses);
  return (
    <div>
      <h2 className="text-lg text-[#2F80ED] font-bold pb-3">
        Credit Hour Remaining: {remainingCredit}hr
      </h2>
      <hr />
      <h4>Remaining Price: {remaining}</h4>
      <h3 className="text-xl font-bold py-8 ">Course Name</h3>
      {selectedCourses.map(course => (
        <div key={course.id}>
          <ol>
            <li>{course.title}</li>
          </ol>
          <hr />
        </div>
      ))}
      <h5 className="py-5">Total Price: {totalCost}</h5>
      <h5>Total Credit: {totalCredit}</h5>
    </div>
  );
};
Cart.propTypes = {
  cart: PropTypes.object.isRequired,
};

export default Cart;
