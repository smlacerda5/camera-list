/* 
for the tooltip to work, you will have to add a hover event:

   .before-icon:hover .tooltip-text {
      visibility: visible !important;
      transition: all 300ms;
      -webkit-transition: all 300ms;
   }

*/
module.exports = React.createClass({
   render: function() {
      const iconStyle = {
         position: "relative",
         margin: "0",
         fontSize: "18px",
         verticalAlign: "middle",
         display: "inline"
      }

      const beforeIconStyle = {
         padding: "10px",
         cursor: "pointer",
         border: "1px solid #0093ee",
         borderRadius: "4px",
         color: "#0093ee",
         display: "inline",
         position: "relative",
      }

      const tooltipStyle = {
         position: "absolute",
         left: "50%",
         top: "-30px",
         background: "white",
         padding: "8px",
         WebkitTransform: "translateX(-50%)",
         transform: "translateX(-50%)",
         position: "absolute",
         visibility: "hidden",
         textAlign: "center",
         whiteSpace: "nowrap",
         zIndex: '10',
      }

      return (
         <div className="before-icon" style={beforeIconStyle}>
            <div className="tooltip-text" style={tooltipStyle}>Add Camera</div>
            <i 
               style={iconStyle} 
               id="btn-add-camera" 
               className="icon video-camera" 
               onClick={this.props.onClick}
            ></i>
         </div>
      )
   }
})
