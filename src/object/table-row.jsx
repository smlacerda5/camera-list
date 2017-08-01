module.exports = React.createClass({
   getInitialState: function() {
      return {
         checked: false,
      }
   },

   toggleCheck: function(e) {
		this.setState({
			checked: !this.state.checked,
		})
   },
   
   render: function() {
      let { mediaserver: mediaserverNames } = this.props.camera.Relations;

      return (
         <tr onClick={this.toggleCheck} onDoubleClick={this.props.handleDblClickRow}>
            <td className="center aligned">
               <input 
                  type="checkbox" 
                  name="selected" 
                  checked={this.state.checked} 
               />
            </td>
            <td className="center aligned">{this.props.camera._id}</td>
            <td className="center aligned">{this.props.camera.Name}</td>
            <td className="center aligned">
               {mediaserverNames.map((mediaserver, idx) => {
                  return <span key={idx-mediaserver}>{idx < mediaserverNames.length - 1 ? mediaserver + ', ' : mediaserver} </span>
               })}
            </td>
            <td className="center aligned"></td>
            <td className="center aligned"></td>
            <td className="center aligned"></td>
         </tr>
      )
   }
})


		// const cameras = this.state.cameras;
		
		// // map each row
		// const cameraList = cameras.map((camera, idx) => {
		// 	let { mediaserver: mediaserverNames } = camera.Relations;

		// 	return (
		// 		<tr key={idx} onClick={this.toggleCheck.bind(this, idx)} onDoubleClick={this.handleDblClickRow.bind(this, idx)}>
		// 			<td className="center aligned">
		// 				<input 
		// 					type="checkbox" 
		// 					name="selected" 
		// 					checked={camera.checked} 
		// 				/>
		// 			</td>
		// 			<td className="center aligned">{camera._id}</td>
		// 			<td className="center aligned">{camera.Name}</td>
		// 			<td className="center aligned">
		// 				{mediaserverNames.map((mediaserver, idx) => {
		// 					return <span key={idx-mediaserver}>{idx < mediaserverNames.length - 1 ? mediaserver + ', ' : mediaserver} </span>
		// 				})}
		// 			</td>
		// 			<td className="center aligned"></td>
		// 			<td className="center aligned"></td>
		// 			<td className="center aligned"></td>
		// 		</tr>
		// 	)
		// });