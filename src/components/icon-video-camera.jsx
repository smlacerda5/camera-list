module.exports = React.createClass({
   render: function() {
      const containerStyle = {
         display: "inline",
      }

      const iconStyle = {
         color: "#2c405a",
         fontSize: "18px",
      }


      return (
         <div className="video-camera-icon" style={containerStyle}>
            <i className="icon video-camera" style={iconStyle}></i>
         </div>
      )
   }
})