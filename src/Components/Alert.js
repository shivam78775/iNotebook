import React from 'react'
const capitalise = (word) => {
  if (typeof word === 'string') {
    if (word === 'danger') {
      word = 'error: ';
    }
    if (word === 'success') {
      word = 'success: ';
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  } else {
    // Handle the case when 'word' is not a string (e.g., undefined)
    return ''; // You can customize the behavior here
  }
};

function Alert(props) {
  return (
    <div id='alert' style={{height:"50px",}}>{
    props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{capitalise(props.alert.type)}</strong>{props.alert.msg}
        
    </div>}
    </div>
  )
}

export default Alert