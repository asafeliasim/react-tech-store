import React from 'react';
import Title from '../../components/Title'


export default function Contact() {
    return (
     <section className="py-5">
         <div className="row">
             <div className="col-10 mx-auto col-md-6 my-3">
                 <Title title="Contact us"/>
                 <form className="mt-5" action="http://formspree.io/asafeliasim@gmail.com" method="POST">
                     {/* first */}
                     <div className="form-group">
                         <input type="text" name="firstName" className="form-control" placeholder="First name"/>
                     </div>
                     {/*email*/}
                     <div className="form-group">
                         <input type="email" name="email" className="form-control" placeholder="Email@Email.com"/>
                     </div>
                     {/*subject*/}
                     <div className="form-group">
                         <input type="text" name="subject" className="form-control" placeholder="Subject"/>
                     </div>
                     {/*message*/}
                     <div className="form">
                         <textarea name="message" className="form-control" rows="10" placeholder="your's message"/>
                     </div>
                     {/*submit*/}
                     <div className="form-group mt-3">
                         <input type="submit" value="Send" className="form-control bg-primary text-white"/>
                     </div>
                 </form>
             </div>
         </div>
     </section>
    )
}
