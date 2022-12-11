import React from 'react'
import logo from"../../Resources/images/icons/logo-sm.png"
import search from"../../Resources/images/icons/search-icon-sm.png"
import cart from"../../Resources/images/icons/cart-sm.png"
import HeaderLink from './HeaderLink'
function Header() {
  return (
    <div>
        <div className="nav-wrapper fixed-top">
		<div className="container">
			<nav className="navbar navbar-toggleable-sm navbar-expand-md">
			    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target=".navbar-collapse">
			        ☰
			    </button>
			    <a className="navbar-brand mx-auto" href="/"><img src={logo}/></a>

			    <div className="navbar-collapse collapse">
			        <ul className="navbar-nav nav-justified w-100 nav-fill">
					<HeaderLink linkUrl="/mac/" linkName="Mac"/>
						<HeaderLink linkUrl="/iphone/" linkName ="iphone"/>
						<HeaderLink linkUrl="/ipad/" linkName="ipad"/>
						<HeaderLink linkUrl="/watch/" linkName ="watch"/>
						<HeaderLink linkUrl="/tv/" linkName ="tv"/>
						<HeaderLink linkUrl="/music/" linkName ="Music"/>
						<HeaderLink linkUrl="/support/" linkName ="Support"/>
						<HeaderLink linkUrl="/cart//" linkName ="Cart"/>
						<li className="nav-item" ><a className="nav-link js-scroll-trigger" href="/search/"><img src={search}/></a></li>
						<li className="nav-item"><a  className="nav-link js-scroll-trigger" href="/cart/"><img src={cart}/></a></li>
			        </ul>
			    </div>
			</nav>
		</div>
	</div>
    </div>
  )
}

export default Header