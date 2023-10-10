import * as yup from "yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Header } from "../Header";
import { getToken } from "../loginWithAuth/TokenService";

// import { useDispatch, useSelector } from "react-redux";



function Host() {
    const baseUrl = process.env.REACT_APP_API_URL;
    console.log(baseUrl);
    const hostUrl = `${baseUrl}/auth/register`//`http://localhost:3001/auth/register`;

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const schema = yup.object().shape({
        id: yup.string(),
        name: yup.string().required("נא להכניס ערך"),
        city: yup.string().required("נא להכניס ערך"),
        accommodationUnit: yup.bool().required("נא לסמן"),
        hasMMD: yup.bool().required("נא לסמן אם קיים מרחב מוגן"),
        numOfBeds: yup.number().required("נא להכניס כמה מיטות יש לכם"),
        numOfMattresses: yup.number().required("נא להכניס כמה מזרונים יש(ניתן להכניס 0)"),
        numOfCribs: yup.number()/*.required("נא להכניס ערך(ניתן להכניס 0)")*/,
        currentlyAvailable: yup.bool().required("נא לסמן"),
        isAccessible: yup.bool(),
        payment: yup.bool().required("נא לסמן"),
        notes: yup.string(),
        phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
        whatsapp: yup.bool().required("נא לסמן"),
        email: yup.string(),
        password: yup.string().min(5).max(12).required()
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });
    var config = {
        headers: { "x-access-token": getToken() }
    };

    const onSubmit = async (data) => {
        console.log(data);
        await axios.post(hostUrl, data, config)
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    console.log(response.data);
                }
                console.log("Post");

            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            <div dir="rtl">
                <div class="row g-0">
                    <div class="card-body p-md-5 text-black">
                        <form className="form" onSubmit={handleSubmit(onSubmit)}>
                            <>
                                <div style={{ "display": "flex" }}>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-3">
                                        <label for="form3Example1m">שם מלא</label>
                                        <input id="form3Example1m" class="form-control"
                                            type="text"
                                            name="name"
                                            {...register('name')} />
                                        <small class="text-danger">
                                            {errors?.name && errors.name.message}
                                        </small>
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label for="form3Example1m">עיר</label>
                                        <input id="form3Example1m" class="form-control"
                                            type="text"
                                            name="city"
                                            {...register('city')}
                                        />
                                        <small class="text-danger">
                                            {errors?.city && errors.city.message}
                                        </small>
                                    </div>
                                </div>


                                <div class="form-row">
                                    <div class="form-group col-md-3">
                                        <label for="form3Example1m">האם יש כניסה נפרדת?</label>
                                        <br />
                                        <label for="form3Example1m">כן</label>
                                        <input type="radio" value="true" name="accommodationUnit"
                                            {...register('accommodationUnit')} />
                                        <br />
                                        <label for="form3Example1m">לא</label>
                                        <input type="radio" value="false" name="accommodationUnit"
                                            {...register('accommodationUnit')}
                                        />
                                        <small class="text-danger">
                                            {errors?.accommodationUnit && errors.accommodationUnit.message}
                                        </small>
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label class="form-label" for="form3Example1m">האם יש מרחב מוגן?</label>
                                        <br />
                                        <label class="form-label" for="form3Example1m">כן</label>
                                        <input type="radio" value="true" name="hasMMD"
                                            {...register('hasMMD')}
                                        />
                                        <br />
                                        <label class="form-label" for="form3Example1m">לא</label>
                                        <input type="radio" value="false" name="hasMMD"
                                            {...register('hasMMD')} />
                                        <small class="text-danger">
                                            {errors?.hasMMD && errors.hasMMD.message}
                                        </small>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-2">
                                        <label for="form3Example1m">מספר מיטות</label>
                                        <input id="form3Example1m" class="form-control"
                                            type="number"
                                            name="numOfBeds"
                                            min="0"
                                            {...register('numOfBeds')}
                                            defaultValue={0}
                                        />
                                        <small class="text-danger">
                                            {errors?.numOfBeds && errors.numOfBeds.message}
                                        </small>
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label for="form3Example1m">מספר מזרנים</label>
                                        <input id="form3Example1m" class="form-control"
                                            type="number"
                                            name="numOfMattresses"
                                            min="0"
                                            {...register('numOfMattresses')}
                                            defaultValue={0}
                                        />
                                        <small class="text-danger">
                                            {errors?.numOfMattresses && errors.numOfMattresses.message}
                                        </small>
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label for="form3Example1m">מספר עריסות</label>
                                        <input id="form3Example1m" class="form-control"
                                            type="number"
                                            name="numOfCribs"
                                            min="0"
                                            {...register('numOfBeds')}
                                            defaultValue={0}
                                        />
                                        <small class="text-danger">
                                            {errors?.numOfCribs && errors.numOfCribs.message}
                                        </small>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-2">
                                        <label class="form-label" for="form3Example1m">הא זמין כרגע?</label>
                                        <br />
                                        <label class="form-label" for="form3Example1m">כן</label>
                                        <input type="radio" value="true" name="currentlyAvailable"
                                            {...register('currentlyAvailable')} />
                                        <br />
                                        <label class="form-label" for="form3Example1m">לא</label>
                                        <input type="radio" value="false" name="currentlyAvailable"
                                            {...register('currentlyAvailable')} />
                                        <small class="text-danger">
                                            {errors?.currentlyAvailable && errors.currentlyAvailable.message}
                                        </small>
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label class="form-label" for="form3Example1m">האם המקום נגיש?</label>
                                        <br />

                                        <label class="form-label" for="form3Example1m">כן</label>

                                        <input type="radio" value="true" name="isAccessible"
                                            {...register('isAccessible')}
                                        />
                                        <br />
                                        <label class="form-label" for="form3Example1m">לא</label>
                                        <input type="radio" value="false" name="isAccessible"
                                            {...register('isAccessible')}
                                        />
                                        <small class="text-danger">
                                            {errors?.isAccessible && errors.isAccessible.message}
                                        </small>
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label class="form-label" for="form3Example1m">האם בתשלום</label>
                                        <br></br>
                                        <label class="form-label" for="form3Example1m">כן</label>

                                        <input type="radio" value="true" name="payment"
                                            {...register('payment')} />
                                        <br />
                                        <label class="form-label" for="form3Example1m">לא</label>
                                        <input type="radio" value="false" name="payment"
                                            {...register('payment')}
                                        />
                                        <br></br>
                                        <small class="text-danger">
                                            {errors?.payment && errors.payment.message}
                                        </small>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="form3Example1m">הערות</label>
                                        <textarea
                                            id="form3Example1m"
                                            class="form-control"
                                            name="notes"
                                            {...register('notes')} />
                                        <small class="text-danger">
                                            {errors?.isAccessible && errors.isAccessible.message}
                                        </small>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-3">
                                        <label for="form3Example1m">מספר טלפון</label>
                                        <input
                                            id="form3Example1m"
                                            class="form-control"
                                            type="text"
                                            name="phone"
                                            maxLength="10"
                                            {...register('phone')}
                                        />
                                        <small class="text-danger">
                                            {errors?.phone && errors.phone.message}
                                        </small>
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label class="form-label" for="form3Example1m">האם יש ווצאפ?</label>
                                        <br></br>
                                        <label class="form-label" for="form3Example1m">כן</label>

                                        <input type="radio" value="true" name="whatsapp"
                                            {...register('whatsapp')}
                                        />
                                        <br></br>
                                        <label class="form-label" for="form3Example1m">לא</label>
                                        <input type="radio" value="false" name="whatsapp"
                                            {...register('whatsapp')}
                                        />
                                        <br></br>
                                        <small class="text-danger">
                                            {errors?.whatsapp && errors.payment.whatsapp}
                                        </small>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-3">
                                        <label for="form3Example1m">דואר אלקטרוני</label>
                                        <input
                                            id="form3Example1m"
                                            class="form-control"
                                            type="email"
                                            name="email"
                                            pattern="[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+"
                                            maxLength="255"
                                            {...register('email')}
                                        />
                                        <small class="text-danger">
                                            {errors?.email && errors.email.message}
                                        </small>
                                    </div>

                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control" placeholder="password" {...register("password")}></input>
                                    <p>{errors.password?.message}</p>
                                </div>

                                <div class="form-row">
                                </div>
                            </>
                            <input class="btn btn-outline-dark" type="submit"></input>
                        </form>
                    </div>
                </div >
            </div >
        </>);
}
export default Host