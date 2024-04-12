import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
    const [activePatty, setActivePatty] = useState(null);
    const [activeCheese, setActiveCheese] = useState(null);
    const [activeVeggies, setActiveVeggies] = useState([]);

    const patties = [
        {
            index: 1,
            name: "Potato",
            price: "2",
            src: "/patty/potato.png"
        },
        {
            index: 2,
            name: "Beans",
            price: "3",
            src: "/patty/beans.png"
        },
        {
            index: 3,
            name: "Paneer",
            price: "3",
            src: "/patty/paneer.png"
        },
        {
            index: 4,
            name: "Mixed Veg",
            price: "2",
            src: "/patty/mixedveg.png"
        }
    ];

    const cheese = [
        {
            index: 1,
            name: "Mozarella",
            price: "2",
            src: "/cheese/mozarella.png"
        },
        {
            index: 2,
            name: "Cheddar",
            price: "3",
            src: "/cheese/cheddar.png"
        },
        {
            index: 3,
            name: "Greek Feta",
            price: "3",
            src: "/cheese/feta.png"
        },
        {
            index: 4,
            name: "Monterey",
            price: "2",
            src: "/cheese/monterey.png"
        }
    ];

    const veggies = [
        {
            index: 1,
            name: "Lettuce",
            price: "2",
            src: "/veggies/lettuce.png"
        },
        {
            index: 2,
            name: "Tomatoes",
            price: "3",
            src: "/veggies/tomato.png"
        },
        {
            index: 3,
            name: "Onions",
            price: "3",
            src: "/veggies/onion.png"
        },
        {
            index: 4,
            name: "Pickles",
            price: "2",
            src: "/veggies/pickle.png"
        }
    ];

    const handlePatty = (index) => {
        setActivePatty(index);
    };

    const handleCheese = (index) => {
        if (activeCheese === index) {
            setActiveCheese(null);
        } else {
            setActiveCheese(index);
        }
    };

    const toggleVeggie = (index) => {
        if (activeVeggies.includes(index)) {
            setActiveVeggies(activeVeggies.filter((item) => item !== index));
        } else {
            setActiveVeggies([...activeVeggies, index]);
        }
    };

    const selectedItems = {
        patty: activePatty ? patties.find(patty => patty.index === activePatty) : null,
        cheese: activeCheese ? cheese.find(cheeseItem => cheeseItem.index === activeCheese) : null,
        veggies: activeVeggies.map(index => veggies.find(veggie => veggie.index === index))
    };

    console.log(selectedItems);

    return (
        <>
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
                <div className="item-columns">
                    <h2>Choose your patty</h2>
                    <div className="item-row">
                        {patties.map((patty) => (
                            <div
                                className={`item ${activePatty === patty.index ? 'selected-item' : ''}`}
                                onClick={() => handlePatty(patty.index)}
                                key={patty.index}
                            >
                                <div className="item-img">
                                    <Image
                                        src={patty.src}
                                        alt={patty.name}
                                        width={84}
                                        height={84}
                                        style={{ objectFit: "contain" }}
                                    />
                                </div>
                                <div className="item-column">
                                    <span className="item-name">{patty.name}</span>
                                    <span className="item-price">{patty.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h2>Pick your cheese</h2>
                    <div className="item-row">
                        {cheese.map((cheeseItem) => (
                            <div
                                className={`item ${activeCheese === cheeseItem.index ? 'selected-item' : ''}`}
                                onClick={() => handleCheese(cheeseItem.index)}
                                key={cheeseItem.index}
                            >
                                <div className="item-img">
                                    <Image
                                        src={cheeseItem.src}
                                        alt={cheeseItem.name}
                                        width={84}
                                        height={84}
                                        style={{ objectFit: "contain" }}
                                    />
                                </div>
                                <div className="item-column">
                                    <span className="item-name">{cheeseItem.name}</span>
                                    <span className="item-price">{cheeseItem.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h2>Add your veggies</h2>
                    <div className="item-row">
                        {veggies.map((veggie) => (
                            <div
                                key={veggie.index}
                                className={`item ${activeVeggies.includes(veggie.index) ? 'selected-item' : ''}`}
                                onClick={() => toggleVeggie(veggie.index)}
                            >
                                <div className="item-img">
                                    <Image
                                        src={veggie.src}
                                        alt={veggie.name}
                                        width={84}
                                        height={84}
                                        style={{ objectFit: "contain" }}
                                    />
                                </div>
                                <div className="item-column">
                                    <span className="item-name">{veggie.name}</span>
                                    <span className="item-price">{veggie.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <p className="selection">
                    {activePatty && <span style={{ color: "#80FF00", marginRight: "4px" }}>+</span>}
                    {activePatty && patties.find(patty => patty.index === activePatty).name}
                    {activeCheese && " / "}
                    {activeCheese && cheese.find(cheeseItem => cheeseItem.index === activeCheese).name}
                    {activeVeggies.length > 0 && (activePatty || activeCheese) && " / "}
                    {activeVeggies.map(index => veggies.find(veggie => veggie.index === index).name).join(" / ")}
                </p>
                <div className="buttons-container">
                    <Link
                        href="/"
                    >
                        <button className="button-secondary">Cancel</button>
                    </Link>
                    <Link
                        href={{
                            pathname: "/checkout",
                            query: {
                                selectedItems: JSON.stringify(selectedItems)
                            }
                        }}
                    >
                        <button className="button-primary">Checkout</button>
                    </Link>
                </div>
            </main>
        </>
    );
}
