import { useRouter } from 'next/router';
import Image from "next/image";
import Link from "next/link";

export default function Checkout() {
    const router = useRouter();
    const { selectedItems } = router.query;

    const parsedSelectedItems = selectedItems ? JSON.parse(selectedItems) : null;

    let veggiesString = '';
    if (parsedSelectedItems && parsedSelectedItems.veggies) {
        veggiesString = parsedSelectedItems.veggies.map(veggie => veggie.name).join(' / ');
    }

    let cheeseString = '';
    if (parsedSelectedItems && parsedSelectedItems.cheese) {
        cheeseString = parsedSelectedItems.cheese.name;
    }

    let subtotal = 0;
    if (parsedSelectedItems) {
        if (parsedSelectedItems.cheese) {
            subtotal += parseFloat(parsedSelectedItems.cheese.price);
        }
        if (parsedSelectedItems.veggies) {
            parsedSelectedItems.veggies.forEach(veggie => {
                subtotal += parseFloat(veggie.price);
            });
        }
    }

    const hstRate = 0.13;
    const hst = subtotal * hstRate;

    const total = subtotal + hst;

    const receiptItems = [cheeseString, veggiesString].filter(item => item).join(' / ');

    return (
        <main className="main">
            <Image
                src="/top.svg"
                alt="img"
                width={500}
                height={57}
            />
            <Image
                className="main-logo"
                src="/logo.svg"
                alt="img"
                width={131.88}
                height={29.27}
            />
            <div className="checkout">
                <h2>Your total</h2>
                <div className="checkout-row checkout-main">
                    <div className="checkout-item_name">
                        <p className="checkout-burger">{parsedSelectedItems && parsedSelectedItems.patty ? parsedSelectedItems.patty.name : ''} Burger</p>
                        {receiptItems && (<p className="selection-checkout"><span style={{ color: "#80FF00", marginRight: "4px" }}>+</span>{receiptItems}</p>)}
                    </div>
                    <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="checkout-row checkout-tax">
                    <div className="checkout-item_name">
                        <p>HST (13%)</p>
                    </div>
                    <p>${hst.toFixed(2)}</p>
                </div>
                <div className="line"></div>
                <div className="checkout-row checkout-total">
                    <div className="checkout-item_name">
                        <p>Total</p>
                    </div>
                    <p>${total.toFixed(2)}</p>
                </div>
                <div className="buttons-container checkout-buttons">
                    <Link
                        href="/order"
                    >
                        <button className="button-secondary">Go back</button>
                    </Link>
                    <Link
                        href="/end"
                    >
                        <button className="button-primary">Pay with card</button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
