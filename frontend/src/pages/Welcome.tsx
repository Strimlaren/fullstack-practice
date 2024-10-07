import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import { CogIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const Welcome = () => {
  return (
    <main className="flex items-center mt-40 ml-12">
      <div className="flex flex-col max-w-4xl">
        <h1 className="text-5xl font-black">AI-Powered SPAM mail.</h1>
        <h4 className="text-2xl mb-5">
          Unlock the power of AI to send enough emails to be sure <br />
          at least one lands in the inbox.
        </h4>
        <div className="flex gap-8">
          <div className="flex flex-col flex-1">
            <RocketLaunchIcon className="size-6" />
            <h3 className="font-semibold">Intelligent Spamming</h3>
            <p>
              Let AI handle the heavy lifting of your spamming, everything from
              maximum emails generated per second to maximizing email size for
              best effect.
            </p>
          </div>
          <div className="flex flex-col flex-1">
            <CogIcon className="size-6" />
            <h3 className="font-semibold">Personalized Spamming</h3>
            <p>
              Tailor your spamming to each group of people, for maximum
              annoyment and dominance.
            </p>
          </div>
          <div className="flex flex-col flex-1">
            <InformationCircleIcon className="size-6" />
            <h3 className="font-semibold">Powerful Spamming</h3>
            <p>
              Gain deep insights about your target audience and spamming
              performance to optimize your spamming strategy.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Welcome;
