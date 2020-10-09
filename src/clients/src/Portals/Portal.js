import React from 'react'
import ReactDOM from 'react-dom'
export class Portal extends React.Component {
  
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount() {
    document.getElementById('portal').appendChild(this.el)
  }

  componentWillUnmount() {
    document.getElementById('portal').removeChild(this.el)
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    )
  }
}
