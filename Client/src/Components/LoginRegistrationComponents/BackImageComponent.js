import React from "react";

export default class BackImageComponent extends React.Component{
    render() {
        return (
            <div className="col-lg-6 d-flex align-items-end" id="bg-block">
                <p className="ms-auto small text-white mb-2">
                    <em>Photo by&nbsp;</em>
                    <a className="text-white" target="_blank"
                        href="https://unsplash.com/@lvnatikk?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
                            <em>Lily Banse</em>
                    </a> <br/>
                </p>
            </div>
        );
    }
}