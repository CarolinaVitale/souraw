import day1Image from "../assets/starter/day1FeedingImage.webp";
import day1FeedingImage from "../assets/starter/day1.webp";
import day2Image from "../assets/starter/day2.webp";
import day2FedImage from "../assets/starter/day2-fed.webp";
import day2After12Image from "../assets/starter/day2-after-12.webp";
import day3Image from "../assets/starter/day3.webp";
import day3FedImage from "../assets/starter/day3-fed.webp";
import day3After12Image from "../assets/starter/ready.webp";
import day4Image from "../assets/starter/day4.webp";
import day4FedImage from "../assets/starter/day4-fed.webp";
import day4After4Image from "../assets/starter/day4-after4.webp";
import day4After6Image from "../assets/starter/day4-after6.webp";
import day5BreadImage from "../assets/starter/day5-bread.webp";
import day5CrumbImage from "../assets/starter/day5-crumb.webp";
import day5FinalImage from "../assets/starter/day5-final.webp";
import readyImage from "../assets/starter/ready.webp";
import readyImage2 from "../assets/starter/ready2.webp";

export const starterTimeline = [

    {
        day: "Day 1",
        subtitle: "Waking up.",
        steps: [
            {
                step: "Rehydrate",
                title: "Wake her up",
                image: day1Image,
                diary: "I'm thirsty. Give me a little time to drink before my first meal.",
                text: (
                    <>
                        <p>
                            Place <strong>20g of dehydrated starter</strong> into a clean jar.
                        </p>

                        <p>
                            Add <strong>25g of warm filtered water</strong>, stir gently,
                            and let it rest for <strong>30 minutes</strong>.
                        </p>

                        <p>
                            This gives the dried starter time to fully rehydrate before
                            its first feeding.
                        </p>
                    </>
                ),
                tip: "Don't rush this step. Rehydrating first helps me wake up gently.",
            },
            {
                step: "First feeding",
                title: "Feed her",
                image: day1FeedingImage,
                diary: "I'm ready for my first meal!",
                text: (
                    <>
                        <p>After 30 minutes, add:</p>

                        <ul className="starter-ingredients">
                            <li>25g bread flour</li>
                            <li>10g warm filtered water</li>
                        </ul>

                        <p>
                            Mix until everything is fully incorporated. Cover loosely
                            and keep your starter in a warm place.
                        </p>
                    </>
                ),
                tip: "Don't worry if nothing happens today. I'm still waking up.",
            },
        ],
    },
    {
        day: "Day 2",
        subtitle: "Building strength.",
        steps: [
            {
                step: "First big rise",
                title: "Time for a bigger meal",
                image: day2Image,
                diary: "Look! I'm growing. Can you see how much I've risen?",
                text: (
                    <>
                        <p>
                            Once your starter has <strong>doubled in size or more</strong>,
                            it’s time for a larger feeding.
                        </p>

                        <ul className="starter-ingredients">
                            <li>25g active starter</li>
                            <li>50g warm filtered water</li>
                            <li>50g bread flour</li>
                        </ul>

                        <p>
                            This is a <strong>1:2:2 feeding ratio</strong>, which gives your
                            starter more food and helps it build strength.
                        </p>

                        <p>
                            In the photo, I marked the starting level with a small line.
                            After about <strong>24 hours</strong>, Fermentina had more than
                            doubled her size. Your starter may grow faster or slower depending
                            on your flour and room temperature.
                        </p>

                        <div className="starter-big-quote">
                            Don&apos;t feed by the clock.
                            <br />
                            Feed by the starter.
                        </div>

                    </>
                ),
                tip: "Your starter decides when it's hungry—not the clock.",
            },
            {
                step: "Freshly fed",
                title: "Now we wait",
                image: day2FedImage,
                diary: "I just had my biggest meal yet. Now give me time to grow.",
                text: (
                    <>
                        <p>
                            This is what your starter may look like right after feeding:
                            freshly mixed, creamy, and quiet.
                        </p>

                        <p>
                            Don’t expect it to rise immediately. It needs time to digest
                            its food and start fermenting again.
                        </p>

                        <details className="starter-details">
                            <summary>Save your flour ♡</summary>

                            <p>
                                You don’t need large feedings to grow a healthy starter.
                                What matters is keeping the same ratio.
                            </p>

                            <ul className="starter-ingredients">
                                <li>25g starter + 50g water + 50g flour</li>
                                <li>10g starter + 20g water + 20g flour</li>
                                <li>5g starter + 10g water + 10g flour</li>
                            </ul>

                            <p>
                                Your starter doesn’t care about the amount.
                                It cares about the ratio.
                            </p>
                        </details>
                    </>
                ),
                tip: "Good things happen while you wait.",
            },
            {
                step: "12 hours later",
                title: "Watch for movement",
                image: day2After12Image,
                diary: "I'm working slowly. Look for bubbles, rise, and texture.",
                text: (
                    <>
                        <p>
                            Around 12 hours after feeding, your starter may begin showing
                            more bubbles, volume, and structure.
                        </p>

                        <p>
                            It may not be ready yet, and that’s okay. Keep watching how it
                            grows instead of following the clock too strictly.
                        </p>
                    </>
                ),
                tip: "Every kitchen is different. Warmth, flour, and time all matter.",
            },
        ],
    },
    {
        day: "Day 3",
        subtitle: "Almost there.",
        steps: [
            {
                step: "24 hours later",
                title: "Look how far she grew",
                image: day3Image,
                diary: "I'm getting stronger. Can you see the rise?",
                text: (
                    <>
                        <p>
                            This is how your starter may look about <strong>24 hours after a
                                1:2:2 feeding</strong>.
                        </p>

                        <p>
                            It should have grown significantly, developed plenty of bubbles,
                            and feel much lighter than before.
                        </p>

                        <p>
                            If your starter looks active like this, it's ready for the next
                            step.
                        </p>
                    </>
                ),
                paragraphs: [
                    <>
                        After about <strong>24 hours</strong>, your starter should be
                        showing more strength, bubbles, and a more predictable rise.
                    </>,
                    
                    <>
                        If it has risen well and looks active, it is time for a larger,
                        slower feeding.
                    </>,
                ],
                tip: "Read the rise, the bubbles, and the smell — not just the clock.",
            },
            {
                step: "1:5:5 feeding",
                title: "Give her more time",
                image: day3FedImage,
                diary: "This meal will give me a longer, steadier rise.",
                text: (
                    <>
                        <p>
                            For this feeding, I used:
                        </p>

                        <ul className="starter-ingredients">
                            <li>10g active starter</li>
                            <li>50g warm filtered water</li>
                            <li>50g bread flour</li>
                        </ul>

                        <p>
                            This is a <strong>1:5:5 feeding ratio</strong>.
                        </p>

                        <p>
                            You don't have to use these exact amounts. Feel free to adjust
                            them depending on the size of your jar or to save flour, as long
                            as you keep the same <strong>1:5:5 ratio</strong>.
                        </p>
                    </>
                ),
                paragraphs: [
                    <>
                        For this feeding, use a <strong>1:5:5 ratio</strong>.
                    </>,
                ],
                ingredients: [
                    "10g active starter",
                    "50g warm filtered water",
                    "50g bread flour",
                ],
                afterText:
                    "Mix well, cover loosely, and leave it in a warm place. This larger feeding gives your starter more food and a longer window to reach peak activity.",
                tip: "More food usually means more time before peak.",
            },
            {
                step: "12 hours later",
                title: "Watch the rhythm",
                image: day3After12Image,
                diary: "I'm rising again. Keep watching my pace.",
                paragraphs: [
                    <>
                        Around <strong>12 hours after a 1:5:5 feeding</strong>, your
                        starter may be rising beautifully, but it might not be at peak yet.
                    </>,
                    <>
                        This is where you start learning its rhythm: how fast it rises,
                        when it slows down, and when it reaches its highest point.
                    </>,
                ],
                tip: "The goal is not speed. The goal is learning when I peak.",
            },
        ],
    },
    {
        day: "Day 4",
        subtitle: "Ready to bake.",
        steps: [
            {
                step: "24 hours later",
                title: "Almost there",
                image: day4Image,
                diary: "I grew a lot. Now I’m starting to come down.",
                text: (
                    <>
                        <p>
                            This is how your starter may look about <strong>24 hours after a 1:5:5 feeding</strong>.
                        </p>

                        <p>
                            You can see how high it rose by the marks left on the walls of the jar.
                            If it has already started to fall, it is active and ready for a final feeding.
                        </p>

                        <p>
                            Now feed it <strong>1:1:1</strong> and watch closely. If it peaks in about
                            <strong> 4–6 hours</strong>, you are ready to bake.
                        </p>
                    </>
                ),
                tip: "A small fall means I reached my peak. Don’t wait until I collapse completely.",
            },
            {
                step: "Final feeding",
                title: "Feed 1:1:1",
                image: day4FedImage,
                diary: "This is my final meal before baking.",
                text: (
                    <>
                        <p>
                            For this final feeding, use a <strong>1:1:1 ratio</strong>.
                        </p>

                        <p>In my case, I used:</p>

                        <ul className="starter-ingredients">
                            <li>25g active starter</li>
                            <li>25g warm filtered water</li>
                            <li>25g bread flour</li>
                        </ul>

                        <p>
                            Feel free to adjust the amounts depending on your jar size.
                            The important part is keeping the <strong>1:1:1 ratio</strong>.
                        </p>

                        <p>
                            Mix well, cover loosely, and keep it in a warm place.
                            Now watch how long it takes to reach peak activity.
                        </p>
                    </>
                ),
                tip: "A strong starter should reach peak in about 4–6 hours after this feeding.",
            },
            {
                step: "4 hours later",
                title: "Watch the rise",
                image: day4After4Image,
                diary: "I’m rising again. Look for bubbles and height.",
                text: (
                    <>
                        <p>
                            About <strong>4 hours after feeding</strong>, your starter may already be rising,
                            full of bubbles, and lighter in texture.
                        </p>

                        <p>
                            If it is still growing, keep watching. You are looking for the moment
                            when it reaches its highest point.
                        </p>
                    </>
                ),
                tip: "Don’t bake just because time passed. Bake when I reach peak activity.",
            },
            {
                step: "6 hours later",
                title: "Peak check",
                image: day4After6Image,
                diary: "If I stopped rising, I’m ready.",
                text: (
                    <>
                        <p>
                            Around <strong>6 hours after feeding</strong>, your starter may be at peak activity.
                        </p>

                        <p>
                            It should look bubbly, airy, alive, and close to its highest point.
                        </p>

                        <div className="starter-big-quote">
                            Don&apos;t bake by the clock.
                            <br />
                            Bake by the starter.
                        </div>

                        <p>
                            If it has stopped rising, or has just started to fall a few millimeters,
                            it is ready to use in your dough.
                        </p>

                        <p>
                            At this point, I used Fermentina to make a small test loaf and see how
                            she would perform after 4 days of activation.
                        </p>
                    </>
                ),
                tip: "Peak activity is the best baking window.",
            },
        ],
    },
    {
        day: "Day 5",
        subtitle: "The first loaf.",
        steps: [
            {
                step: "Test bake",
                title: "Look what she made",
                image: day5BreadImage,
                diary: "I did it. I became bread.",
                text: (
                    <>
                        <p>
                            After using the starter on Day 4, I made a small loaf to test
                            if Fermentina was strong enough after only 4 days of activation.
                        </p>

                        <p>
                            The dough fermented overnight, and this is how the bread looked
                            after baking the next day.
                        </p>
                    </>
                ),
                tip: "Your first loaf doesn’t have to be perfect. It just has to teach you something.",
            },
            {
                step: "The crumb",
                title: "Inside the loaf",
                image: day5CrumbImage,
                diary: "Not bad for my first loaf back.",
                text: (
                    <>
                        <p>
                            The inside of the loaf tells part of the story: fermentation,
                            strength, timing, and patience.
                        </p>

                        <p>
                            If your starter can help your dough rise and bake into bread,
                            it is alive, active, and ready to keep getting stronger.
                        </p>
                    </>
                ),
                tip: "Every loaf is feedback.",
            },
            {
                step: "The proof",
                title: "From starter to bread",
                image: day5FinalImage,
                diary: "Now it’s your turn.",
                text: (
                    <>
                        <p>
                            This is the moment everything comes full circle:
                            dehydrated starter, water, flour, time, patience, and finally bread.
                        </p>

                        <div className="starter-big-quote">
                            From sleeping starter
                            <br />
                            to living bread.
                        </div>

                        <p>
                            If your starter behaves like this, you’re ready to begin your own
                            sourdough journey.
                        </p>
                    </>
                ),
                tip: "Welcome to slow baking.",
            },
        ],
    },
    
];

export const readySteps = [
    {
        step: "Peak time",
        title: "Find the peak",
        image: readyImage,
        diary: "I'm at my strongest point!",
        text: (
            <p>
                Your starter is ready when it has reached its highest point and
                has stopped rising. This is peak activity — not simply the moment
                it doubles in size.
            </p>
        ),
        tip: "The best baking window is when I stop rising, before I start falling.",
    },
    {
        step: "Still unsure?",
        title: "Wait a few millimeters",
        image: readyImage2,
        diary: "If you're not sure, watch me a little longer.",
        text: (
            <p>
                If you are not sure whether your starter has stopped growing,
                wait until it begins to fall just a few millimeters. That tiny
                drop tells you it already reached its peak.
            </p>
        ),
        tip: "A tiny fall is okay. Don’t wait until I collapse completely.",
    },
];