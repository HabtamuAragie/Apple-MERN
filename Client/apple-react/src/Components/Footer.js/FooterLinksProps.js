import React, { Component } from 'react'

export default class FooterLinksProps extends Component {
  render() {
    return (
      <div>
        {this.props.mydata.map((item)=>{
            return(
                <div>
                    <h3>{item.h3.title}</h3>
                    <ul>
                        {item.h3.links.map((link)=>{
                            return(
                                <li>
                                    <a href="#">{link}</a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )
        })}
      </div>
    )
  }
}
