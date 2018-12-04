import { Component } from 'react';
import Link from 'next/link';
export default class Admin extends Component {
    render() {
        return (
            <div className="root">
                <h1>kvote admin interface</h1>
                <div className="links">
                    <div className="link"><Link href="/admin/create">create vote</Link></div>
                    <div className="link"><Link href="/admin/result">see result</Link></div>
                </div>
            </div>
        )
    }
}